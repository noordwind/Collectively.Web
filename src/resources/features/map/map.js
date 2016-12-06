import {inject, bindable} from 'aurelia-framework';
import TranslationService from 'resources/services/translation-service';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import FiltersService from 'resources/services/filters-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, TranslationService, LocationService, FiltersService, EventAggregator)
export class Map {
    @bindable remarks = [];
    @bindable radiusChanged = null;
    @bindable center = null;

  constructor(router, translationService, location, filtersService, eventAggregator) {
    this.router = router;
    this.translationService = translationService;
    this.location = location;
    this.filtersService = filtersService;
    this.filters = this.filtersService.filters;
    this.eventAggregator = eventAggregator;
    this.map = null;
    this.radius = null;
    this.defaultRemarkMarkerColor = '9F6807';
    this.userMarker = null;
    this.centerInitialized = false;
  }

  async attached() {
    let latitude = this.filters.center.latitude;
    let longitude = this.filters.center.longitude;
    let userLatitude = this.location.current.latitude;
    let userLongitude = this.location.current.longitude;
    if (latitude === 0 && longitude === 0) {
      latitude = userLatitude;
      longitude = userLongitude;
    }
    this.userPosition = {lat: userLatitude, lng: userLongitude};
    this.position = {lat: latitude, lng: longitude};
    this.drawMap();
    this.drawUserMarker();
    // this.drawRadius();
    this.eventAggregator.publish('map:loaded');
    this.locationLoadedSubscription = await this.eventAggregator.subscribe('location:loaded',
        async response => await this.locationUpdated(response));
  }

  detached() {
    this.locationLoadedSubscription.dispose();
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
    this.position = {lat: newValue.latitude, lng: newValue.longitude};
    this.map.setCenter(this.position);
    this.centerInitialized = true;
  }

  async locationUpdated(location) {
    let lng = location.coords.longitude;
    let lat = location.coords.latitude;
    this.userPosition = { lat, lng };
    this.drawUserMarker();
  }

  drawMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: this.filters.map.zoomLevel,
      minZoom: 8,
      center: this.position
    });

    this.map.addListener('zoom_changed', () => {
      this.filters.map.zoomLevel = this.map.getZoom();
      this._recalculateRadius();
    });

    this.map.addListener('dragend', () => {
      this._recalculateRadius();
    });

    this.map.addListener('center_changed', () => {
      let center = this.map.getCenter();
      let latitude = center.lat();
      let longitude = center.lng();
      this.filters.center.latitude = latitude;
      this.filters.center.longitude = longitude;
      this._updateFilters();
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

    this.filters.radius = radiusMeters;
    this._updateFilters();
    if (this.radiusChanged !== null) {
      this.radiusChanged(radiusMeters, center);
    }
  }

  drawUserMarker() {
    let lat = this.userPosition.lat;
    let lng = this.userPosition.lng;
    if (this.userMarker !== null) {
      this.userMarker.setMap(null);
    }
    let title = this.translationService.tr('common.user');
    let content = this.translationService.tr('common.you_are_here');
    this.userMarker = this.drawMarker(lng, lat, title, content, 'FFEBEE');
    this.moveMarker(this.userMarker, lat, lng);
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
    description = description.length > 15 ? `${description.substring(0, 15)}...` : description;
    let content = `<strong>${category}</strong><br/><a href="${url}" class="btn waves-effect waves-light">${detailsText}</a><br/>${description}`;
    this.drawMarker(longitude, latitude, detailsText, content, color);
  }

  getRemarMarkerkColor(remark) {
    if (remark.selected) {
      return '3399FF';
    }
    if (remark.resolved) {
      return '009720';
    }

    switch (remark.category) {
    case 'accidents': return 'FBF514';
    case 'damages': return 'E40521';
    case 'litter': return '9F6807';
    default: return this.defaultRemarkMarkerColor;
    }
  }

  drawMarker(longitude, latitude, title, content, color) {
    let icon = new google.maps.MarkerImage(`https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color}`);
    let position = {lng: longitude, lat: latitude};
    let infowindow = new google.maps.InfoWindow({
      content: content
    });
    let marker = new google.maps.Marker({
      position: position,
      title: title,
      map: this.map,
      icon: icon
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

  _updateFilters() {
    this.filtersService.filters = this.filters;
  }
}
