import {inject} from 'aurelia-framework';
import environment from '../../environment';
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';


@inject(HttpClient, EventAggregator)
export default class LocationService {
  constructor(httpClient, eventAggregator) {
    this.allowedDistance = 15.0;
    this.httpClient = httpClient;
    this.eventAggregator = eventAggregator;
    this.isUpdating = false;
  }

  async getLocation(next, err, skipError) {
    let self = this;
    skipError = skipError || this.exists;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async location => {
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;
        let address = await this.getAddress(latitude, longitude);
        self.current = {
          longitude: longitude,
          latitude: latitude,
          accuracy: location.coords.accuracy,
          address: address
        };
        self.eventAggregator.publish('location:loaded', location);
        if (typeof next !== 'undefined') {
          next(location);
        }
        return;
      }, function(error) {
        if (typeof err !== 'undefined') {
          err(error);
          return;
        }
        if (skipError) {
          return;
        }
        if (error.code === 1) {
          self.eventAggregator.publish('location:error');
        }
      });
      return;
    }
    if (skipError) {
      return;
    }
    self.eventAggregator.publish('location:error');
  }

  async getAddress(latitude, longitude) {
    let response = await this.httpClient.fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`);
    let addressComponents = await response.json();
    if (addressComponents.results.length === 0) {
      return '';
    }

    return addressComponents.results[0].formatted_address;
  }

  get current() {
    return JSON.parse(localStorage.getItem(environment.locationStorageKey));
  }

  set current(newLocation) {
    localStorage.setItem(environment.locationStorageKey, JSON.stringify(newLocation));
  }

  get exists() {
    let location = this.current;

    return location !== null &&
                typeof location !== 'undefined' &&
                Object.keys(location).length !== 0 && location.constructor === Object;
  }

  clear() {
    this.current = null;
  }

  isInRange(target, maxDistance) {
    maxDistance = maxDistance || this.allowedDistance;
    let distanceInMeters = this.calculateDistance(target);

    return distanceInMeters <= maxDistance;
  }

  calculateDistance(target) {
    let source = this.current;
    let distanceToRadians = Math.PI / 180.0;
    let EarthRadius = 6378.1370;

    let sourceLatitudeInRadians = source.latitude * distanceToRadians;
    let targetLatitudeInRadians = target.latitude * distanceToRadians;
    let latitudeDifferenceInRadians = (target.latitude - source.latitude) * distanceToRadians;
    let longitudeDifferenceInRadians = (target.longitude - source.longitude) * distanceToRadians; 

    let a = Math.sin(latitudeDifferenceInRadians / 2) * Math.sin(latitudeDifferenceInRadians / 2) +
                Math.cos(sourceLatitudeInRadians) * Math.cos(targetLatitudeInRadians) *
                Math.sin(longitudeDifferenceInRadians / 2) * Math.sin(longitudeDifferenceInRadians / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let distanceInMeters = EarthRadius * c * 1000;

    return distanceInMeters;
  }

  startUpdating() {
    if (this.isUpdating) {
      return;
    }

    this.isUpdating = true;
    this._updateLocationTask();
  }

  _updateLocationTask() {
    if (!this.isUpdating) {
      return;
    }

    setTimeout(_ => {
      this.getLocation();
      this._updateLocationTask();
    }, 3000);
  }
}
