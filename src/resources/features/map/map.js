import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import environment from '../../../environment';
import TranslationService from 'resources/services/translation-service';
import LocationService from 'resources/services/location-service';
import FiltersService from 'resources/services/filters-service';
import StorageService from 'resources/services/storage-service';
import LogService from 'resources/services/log-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, TranslationService, LocationService,
FiltersService, StorageService, LogService, EventAggregator)
export class Map {
    @bindable remarks = [];
    @bindable radiusChanged = null;
    @bindable center = null;

  constructor(router, translationService, location,
  filtersService, storageService, logService, eventAggregator) {
    this.router = router;
    this.environment = environment;
    this.translationService = translationService;
    this.location = location;
    this.filtersService = filtersService;
    this.storageService = storageService;
    this.log = logService;
    this.eventAggregator = eventAggregator;
    this.map = null;
    this.radius = null;
    this.defaultRemarkMarkerColor = '9F6807';
    this.userMarker = null;
    this.remarkToCreateMarker = null;
    this.centerInitialized = false;
    this.storageService.delete(this.environment.createRemarkLocationStorageKey);
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
    this.remarkToCreatePosition = new google.maps.LatLng(userLatitude, userLongitude);
    this.position = new google.maps.LatLng(latitude, longitude);
    this.drawMap();
    this.drawUserMarker();
    this.eventAggregator.publish('map:loaded');
    this.locationLoadedSubscription = await this.eventAggregator.subscribe('location:loaded',
        async response => await this.locationUpdated(response));
    this.resetCenterSubscription = await this.eventAggregator.subscribe('location:reset-center',
      async response => {
        this.filtersService.setMapFollow(true);
        let position = new google.maps.LatLng(response.latitude, response.longitude);
        await this.map.setCenter(position);
        await this.eventAggregator.publish('map:location-restored', response);
      });
    this.centerChangedSubscription = await this.eventAggregator.subscribe('map:centerChanged',
      async center => {
        let position = new google.maps.LatLng(center.latitude, center.longitude);
        await this.map.setCenter(position);
      });
  }

  detached() {
    this.locationLoadedSubscription.dispose();
    this.resetCenterSubscription.dispose();
    this.centerChangedSubscription.dispose();
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
    this.moveUserMarker();
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
      disableDefaultUI: true,
      styles: [{featureType: 'poi', elementType: 'labels', stylers: [{visibility: 'off'}]}]
    });

    this.map.addListener('click', async event => {
      this.remarkToCreatePosition = event.latLng;
      let address = await this.drawRemarkToCreateMarker();
      this.storageService.write(this.environment.createRemarkLocationStorageKey, 
          {address, latitude: event.latLng.lat(), longitude: event.latLng.lng()});
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
      let position = {
        latitude: center.lat(),
        longitude: center.lng()
      };
      this.filtersService.setCenter(position);
      this.eventAggregator.publish('remarks:update-map-remarks');
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

  async drawRemarkToCreateMarker() {
    let lat = this.remarkToCreatePosition.lat();
    let lng = this.remarkToCreatePosition.lng();
    if (this.remarkToCreateMarker !== null) {
      this.remarkToCreateMarker.setMap(null);
    }
    let address = await this.location.getAddress(lat, lng);
    let title = `${this.translationService.tr('remark.create_here')}:\n${address}.`;
    let markerImg = 'assets/images/create_remark_marker.png';
    this.remarkToCreateMarker = this.drawMarker(lng, lat, title, null, markerImg, 50, 50, 
        true, () => 
        { 
          this.remarkToCreatePosition = this.userPosition;
          this.storageService.delete(this.environment.createRemarkLocationStorageKey);
        }); 
      
    return address;
  }

  drawUserMarker() {
    let lat = this.userPosition.lat();
    let lng = this.userPosition.lng();
    if (this.userMarker !== null) {
      this.userMarker.setMap(null);
    }
    let title = this.translationService.tr('common.user');
    let content = this.translationService.tr('common.you_are_here');
    let markerImg = 'assets/images/current_location.png';
    this.userMarker = this.drawMarker(lng, lat, title, content, markerImg, 35, 35);
  }

  moveUserMarker() {
    let lat = this.userPosition.lat();
    let lng = this.userPosition.lng();
    let bounds = this.map.getBounds();
    if (bounds && bounds.contains(this.userPosition)) {
      this.moveMarker(this.userMarker, lat, lng);
    }
  }

  moveMarker(marker, lat, lng) {
    let position = new google.maps.LatLng(lat, lng);
    marker.setPosition(position);
  }

  drawRemarkMarker(remark) {
    let longitude = remark.location.coordinates[0];
    let latitude = remark.location.coordinates[1];
    let category = this.translationService.tr(`remark.category_${remark.category.name}`);
    let group = remark.group !== null ? `<em>${remark.group.name}</em><br/>` : '';
    let detailsText = this.translationService.tr('common.details');
    let url = this.router.generate('remark', {id: remark.id});
    let description = remark.description ? remark.description : '';
    let markerImage = this.getRemarkMarker(remark);
    let enlarge = remark.rating >= 2 && this.filters && this.filters.distinguishLiked;
    let width = enlarge ? 50 : 37.5;
    let height = enlarge ? 75 : 50;
    description = description.length > 15 ? `${description.substring(0, 15)}...` : description;
    let content = `<div class="marker-content"><strong>${category}</strong><br/>${group}<a href="${url}" class="btn waves-effect waves-light">${detailsText}</a><br/>${description}</div>`;
    this.drawMarker(longitude, latitude, detailsText, content, markerImage, width, height);
  }

  getDefaultGoogleMarker(color) {
    return `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color}`;
  }

  getRemarkMarker(remark) {
    return `/assets/images/markers/${remark.category.name}_marker_${remark.state.state}.png`;
  }

  drawMarker(longitude, latitude, title, content, imgPath, width, height, 
      removeOnClick = false, removeOnClickFunc) {
    let position = new google.maps.LatLng(latitude, longitude);
    let infowindow = new google.maps.InfoWindow({
      content: content
    });
    width = width || 37.5;
    height = height || 50;
    let size = new google.maps.Size(width, height);
    let marker = new google.maps.Marker({
      position: position,
      title: title,
      map: this.map,
      icon: {
        url: imgPath,
        scaledSize: size
      }
    });
    if (removeOnClick) {
      marker.addListener('click', function() {
        marker.setMap(null);
        if (removeOnClickFunc) {
          removeOnClickFunc();
        }
      });
    } else {
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    }

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
