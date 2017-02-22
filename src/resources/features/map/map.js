import {inject, bindable} from 'aurelia-framework';
import TranslationService from 'resources/services/translation-service';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import FiltersService from 'resources/services/filters-service';
import LogService from 'resources/services/log-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, TranslationService, LocationService,
FiltersService, LogService, EventAggregator)
export class Map {
    @bindable remarks = [];
    @bindable radiusChanged = null;
    @bindable center = null;

  constructor(router, translationService, location,
  filtersService, logService, eventAggregator) {
    this.router = router;
    this.translationService = translationService;
    this.location = location;
    this.filtersService = filtersService;
    this.log = logService;
    this.eventAggregator = eventAggregator;
    this.map = null;
    this.radius = null;
    this.defaultRemarkMarkerColor = '9F6807';
    this.userMarker = null;
    this.centerInitialized = false;
  }

  async attached() {
    let filters = this.filtersService.filters;
    let latitude = filters.center.latitude;
    let longitude = filters.center.longitude;
    let userLatitude = this.location.current.latitude;
    let userLongitude = this.location.current.longitude;
    if (latitude === 0 && longitude === 0) {
      latitude = userLatitude;
      longitude = userLongitude;
    }
    this.userPosition = new google.maps.LatLng(userLatitude, userLongitude);
    this.position = new google.maps.LatLng(latitude, longitude);
    this.drawMap();
    this.drawUserMarker();
    // this.drawRadius();
    this.eventAggregator.publish('map:loaded');
    this.locationLoadedSubscription = await this.eventAggregator.subscribe('location:loaded',
        async response => await this.locationUpdated(response));
    this.resetCenterSubscription = await this.eventAggregator.subscribe('location:reset-center',
      async response => {
        this.filtersService.setMapFollow(true);
        this.position = new google.maps.LatLng(response.latitude, response.longitude);
        await this.map.setCenter(this.position);
      });
  }

  detached() {
    this.locationLoadedSubscription.dispose();
    this.resetCenterSubscription.dispose();
  }

  remarksChanged(newValue) {
    newValue.forEach(remark => this.drawRemarkMarker(remark));
  }

  centerChanged(newValue) {
    if (this.centerInitialized) {
      return;
    }
    if (this.map === null) {
      return;
    }
    if (typeof newValue === 'undefined' || newValue === null) {
      return;
    }
    this.position = new google.maps.LatLng(newValue.latitude, newValue.longitude);
    this.map.setCenter(this.position);
    this.centerInitialized = true;
  }

  async locationUpdated(location) {
    let lng = location.coords.longitude;
    let lat = location.coords.latitude;
    this.userPosition = new google.maps.LatLng(lat, lng);
    this.drawUserMarker();
    this.filtersService.setDefaultCenter({latitude: lat, longitude: lng});
    if (this.filtersService.filters.map.follow) {
      await this.map.setCenter(this.userPosition);
    }
  }

  drawMap() {
    let filters = this.filtersService.filters;
    this.log.trace('map_draw', {position: this.position, filters: filters});
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: filters.map.zoomLevel,
      minZoom: 8,
      center: this.position,
      gestureHandling: 'greedy',
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      styles: [{featureType: 'poi', elementType: 'labels', stylers: [{visibility: 'off'}]}]
    });

    this.map.addListener('zoom_changed', () => {
      this.filtersService.setZoomLevel(this.map.getZoom());
      this._recalculateRadius();
    });

    this.map.addListener('dragstart', () => {
      if (this.filtersService.filters.map.follow) {
        this.filtersService.setMapFollow(false);
      }
    });

    this.map.addListener('dragend', () => {
      this._recalculateRadius();
    });

    this.map.addListener('center_changed', () => {
      let center = this.map.getCenter();
      let latitude = center.lat();
      let longitude = center.lng();
      this.filtersService.setCenter({latitude: latitude, longitude: longitude});
    });
  }

  _recalculateRadius() {
    let bounds = this.map.getBounds();
    let center = bounds.getCenter();
    let northEast = bounds.getNorthEast();
    let earthRadius = 6378000.41;
    let centerLat = center.lat() / 57.2958;
    let centerLng = center.lng() / 57.2958;
    let northEastLat = northEast.lat() / 57.2958;
    let northEastLng = northEast.lng() / 57.2958;
    let radiusMeters = earthRadius * Math.acos(Math.sin(centerLat) * Math.sin(northEastLat) +
                        Math.cos(centerLat) * Math.cos(northEastLat) * Math.cos(northEastLng - centerLng));

    this.filtersService.setRadius(radiusMeters);
    if (this.radiusChanged !== null) {
      let args = {
        radiusMeters,
        center
      };
      this.radiusChanged(args);
    }
  }

  drawUserMarker() {
    let lat = this.userPosition.lat();
    let lng = this.userPosition.lng();
    if (this.userMarker !== null) {
      this.userMarker.setMap(null);
    }
    let title = this.translationService.tr('common.user');
    let content = this.translationService.tr('common.you_are_here');
    this.userMarker = this.drawMarker(lng, lat, title, content, 'FFEBEE');
    let bounds = this.map.getBounds();
    if (bounds && bounds.contains(this.userPosition)) {
      this.moveMarker(this.userMarker, lat, lng);
    }
  }

  moveMarker(marker, lat, lng) {
    let position = new google.maps.LatLng(lat, lng);
    marker.setPosition(position);
    // this.map.panTo(position);
  }

  drawRemarkMarker(remark) {
    let longitude = remark.location.coordinates[0];
    let latitude = remark.location.coordinates[1];
    let category = this.translationService.tr(`remark.category_${remark.category}`);
    let color = this.getRemarMarkerkColor(remark);
    let detailsText = this.translationService.tr('common.details');
    let url = this.router.generate('remark', {id: remark.id});
    let description = remark.description ? remark.description : '';
    let enlarge = remark.rating >= 2 && this.filters.distinguishLiked;
    description = description.length > 15 ? `${description.substring(0, 15)}...` : description;
    let content = `<strong>${category}</strong><br/><a href="${url}" class="btn waves-effect waves-light">${detailsText}</a><br/>${description}`;
    this.drawMarker(longitude, latitude, detailsText, content, color, enlarge);
  }

  getRemarMarkerkColor(remark) {
    if (remark.selected) {
      return '3399FF';
    }
    if (remark.resolved) {
      return '009720';
    }

    switch (remark.category) {
    case 'defect': return 'E40521';
    case 'issue': return 'E08040';
    case 'suggestion': return 'FBF514';
    case 'praise': return '43C9E7';
    default: return this.defaultRemarkMarkerColor;
    }
  }

  drawMarker(longitude, latitude, title, content, color, enlarge) {
    let position = new google.maps.LatLng(latitude, longitude);
    let infowindow = new google.maps.InfoWindow({
      content: content
    });
    let size = enlarge ? new google.maps.Size(30, 45) : new google.maps.Size(20, 30);
    let marker = new google.maps.Marker({
      position: position,
      title: title,
      map: this.map,
      icon: {
        url: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color}`,
        scaledSize: size
      }
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    return marker;
  }

  drawRadius() {
    this.radius = new google.maps.Circle({
      strokeColor: '#308AF1',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#308AF1',
      fillOpacity: 0.3,
      map: this.map,
      center: this.position,
      radius: parseFloat(this.filters.radius)
    });
  }
}
