import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';
import environment from '../../environment';
import {EventAggregator} from 'aurelia-event-aggregator';


@inject(EventAggregator)
export default class LocationService {
    constructor(eventAggregator){
        this.allowedDistance = 15.0;
        this.eventAggregator = eventAggregator;
        this.locationLoadedSubscription = null;
        var self = this;
        this.getLocation(function(location){
            self.current = {
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
                accuracy: location.coords.accuracy
            };
            self.eventAggregator.publish('location:loaded');
        });
    }

    getLocation(next, err){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(next);
            
            return;
        }
        err();
    }

    get current() {
        return JSON.parse(localStorage.getItem(environment.locationStorageKey));
    }

    set current(newLocation) {
        localStorage.setItem(environment.locationStorageKey, JSON.stringify(newLocation));
    }

    isInRange(target){
        let distanceInMeters = this.calculateDistance(this.current, target) * 1000;

        return distanceInMeters <= this.allowedDistance;
    }

    calculateDistance(source, target){
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

        let distanceInKilometers = EarthRadius * c;

        return distanceInKilometers;
    }
}