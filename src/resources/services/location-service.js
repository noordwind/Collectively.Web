import {inject} from 'aurelia-framework';
import environment from '../../environment';
import {EventAggregator} from 'aurelia-event-aggregator';


@inject(EventAggregator)
export default class LocationService {
    constructor(eventAggregator) {
        this.allowedDistance = 15.0;
        this.eventAggregator = eventAggregator;
        this.isUpdating = false;
    }

  async getLocation(next, err, skipError) {
    let self = this;
    skipError = skipError || this.exists;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(location) {
        self.current = {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
          accuracy: location.coords.accuracy
        };
        self.eventAggregator.publish('location:loaded');
        if (typeof next !== 'undefined') {
          next(location);
        }
        return;
      }, function(error) {
        if (typeof err !== 'undefined') {
            err(error);
            return;
        }
        if(skipError) {
            return;
        }
        if (error.code === 1) {
           self.eventAggregator.publish('location:error');
        }
      });
      return;
    }
    if(skipError) {
        return;
    }
    self.eventAggregator.publish('location:error');
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

    isInRange(target) {
        let distanceInMeters = this.calculateDistance(target);

        return distanceInMeters <= this.allowedDistance;
    }

    calculateDistance(target) {
        let source = this.current;
        let distanceToRadians = Math.PI / 180.0;
        let EarthRadius = 6378.1370;

        let sourceLatitudeInRadians = source.latitude * distanceToRadians;
        let targetLatitudeInRadians = target.latitude * distanceToRadians;
        let latitudeDifferenceInRadians = (target.latitude - source.latitude) * distanceToRadians;
        let longitudeDifferenceInRadians = (target.longitude - source.longitude) * distanceToRadians;;

        let a = Math.sin(latitudeDifferenceInRadians/2) * Math.sin(latitudeDifferenceInRadians/2) +
                Math.cos(sourceLatitudeInRadians) * Math.cos(targetLatitudeInRadians) *
                Math.sin(longitudeDifferenceInRadians/2) * Math.sin(longitudeDifferenceInRadians/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        let distanceInMeters = EarthRadius * c * 1000;

        return distanceInMeters;
    }

    startUpdating() {
        if(this.isUpdating) {
            return;
        }

        this.isUpdating = true;
        this._updateLocationTask();
    }

    _updateLocationTask() {
        if(!this.isUpdating) {
            return;
        }

        setTimeout(_ => {
            this.getLocation();
            this._updateLocationTask();
        }, 3000);
    }
}