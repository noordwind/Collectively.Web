import {inject} from 'aurelia-framework';
import ApiBaseService from 'resources/services/api-base-service';
import environment from '../../environment';
import {EventAggregator} from 'aurelia-event-aggregator';


@inject(EventAggregator)
export default class LocationService {
    constructor(eventAggregator){
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
}