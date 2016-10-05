import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, LocationService, RemarkService, EventAggregator)
export class Remark {
    constructor(router, locationService, remarkService, eventAggregator) {
        this.router = router;
        this.locationService = locationService;
        this.remarkService = remarkService;
        this.eventAggregator = eventAggregator;
    }

    async activate(){
    }
}
