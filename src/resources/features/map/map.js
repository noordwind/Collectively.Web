import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import FiltersService from 'resources/services/filters-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, LocationService, FiltersService, EventAggregator, )
export class Map {
    @bindable remarks = [];

  constructor(router, location, filters, eventAggregator) {
    this.router = router;
    this.location = location;
    this.filters = filters;
    this.eventAggregator = eventAggregator;
    this.map = null;
    this.radius = null;
    this.defaultRemarkMarkerColor = '9F6807';
    this.userMarker = null;
  }

  async attached() {
    let longitude = this.location.current.longitude;
    let latitude = this.location.current.latitude;
    this.position = {lat: latitude, lng: longitude};
    this.drawMap();
    this.drawUserMarker();
    this.drawRadius();
    this.eventAggregator.publish('map:loaded');
    this.locationLoadedSubscription = await this.eventAggregator.subscribe('location:loaded',
        async response => this.locationUpdated(response));
  }

  detached() {
    this.locationLoadedSubscription.dispose();
  }

  remarksChanged(newValue) {
    newValue.forEach(remark => this.drawRemarkMarker(remark));
  }

  locationUpdated(location) {
    let lng = location.coords.longitude;
    let lat = location.coords.latitude;
    this.position = { lat, lng };
    this.drawUserMarker();
  }

  drawMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: this.position
    });
  }

  drawUserMarker() {
    let lat = this.position.lat;
    let lng = this.position.lng;
    if (this.userMarker !== null) {
      this.userMarker.setMap(null);
    }
    this.userMarker = this.drawMarker(lng, lat, 'User', 'Hey, you are here!', 'FFEBEE');
    this.moveMarker(this.userMarker, lat, lng);
  }

  moveMarker(marker, lat, lng) {
    let position = new google.maps.LatLng(lat, lng);
    marker.setPosition(position);
    this.map.panTo(position);
  }

  drawRemarkMarker(remark) {
    let longitude = remark.location.coordinates[0];
    let latitude = remark.location.coordinates[1];
    let category = remark.category.name;
    let color = this.getRemarMarkerkColor(remark);
    let url = this.router.generate('remark', {id: remark.id});
    let description = remark.description ? remark.description : '';
    description = description.length > 15 ? `${description.substring(0, 15)}...` : description;
    let content = `<strong>${category}</strong><br/><a href="${url}" class="btn waves-effect waves-light">Details</a><br/>${description}`;
    this.drawMarker(longitude, latitude, 'Details', content, color);
  }

  getRemarMarkerkColor(remark) {
    if (remark.resolved) {
      return '009720';
    }

    switch (remark.category.name) {
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
      radius: parseFloat(this.filters.filters.radius)
    });
  }
}
