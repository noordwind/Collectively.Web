import {inject} from 'aurelia-framework';
import environment from '../../environment';
import {HttpClient} from 'aurelia-fetch-client';
import StorageService from 'resources/services/storage-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, StorageService, EventAggregator)
export default class LocationService {
  constructor(httpClient, storageService, eventAggregator) {
    this.allowedDistance = 15.0;
    this.httpClient = httpClient;
    this.storageService = storageService;
    this.environment = environment;
    this.eventAggregator = eventAggregator;
    this.isUpdating = false;
    this.updateAddress = false;
  }

  async getLocation(next, err, skipError) {
    let that = this;
    skipError = skipError || this.exists;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async location => {
        if (that.current === null) {
          that.current = {};
        }
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;
        let current = {
          longitude: longitude,
          latitude: latitude,
          accuracy: location.coords.accuracy,
          address: that.current.address,
          bounds: that.current.bounds
        };
        if (that.updateAddress) {
          let address = await that.getAddress(latitude, longitude);
          current.address = address;
        }
        that.current = current;
        that.eventAggregator.publish('location:loaded', location);
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
          that.eventAggregator.publish('location:error');
        }
      });
      return;
    }
    if (skipError) {
      return;
    }
    that.eventAggregator.publish('location:error');
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
    let location = this.storageService.read(this.environment.locationStorageKey);

    return location;
  }

  set current(newLocation) {
    this.storageService.write(this.environment.locationStorageKey, newLocation);
  }

  get exists() {
    let location = this.current;

    return location !== null &&
                typeof location !== 'undefined' &&
                Object.keys(location).length !== 0 && location.constructor === Object;
  }

  clear() {
    this.current = null;
    this.storageService.delete(this.environment.locationStorageKey);
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

  stopUpdating() {
    this.isUpdating = false;
  }

  startUpdatingAddress() {
    this.updateAddress = true;
  }

  stopUpdatingAddress() {
    this.updateAddress = false;
  }

  _updateLocationTask() {
    if (!this.isUpdating) {
      return;
    }

    setTimeout(_ => {
      this.getLocation();
      this._updateLocationTask();
    }, 500);
  }
}
