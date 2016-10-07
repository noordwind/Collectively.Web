import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, LocationService, RemarkService, EventAggregator)
export class Remarks {
    constructor(router, locationService, remarkService, eventAggregator) {
        this.router = router;
        this.locationService = locationService;
        this.remarkService = remarkService;
        this.eventAggregator = eventAggregator;
        this.radius = 1000;
        this.location = {};
        this.query = {
            radius: this.radius
        };
        this.remarks = [];
    }

    async activate(){
        await this.eventAggregator.subscribe('map:loaded', async response => {
            this.locationService.getLocation(async location => {
                this.location = location.coords;
                this.query.longitude = this.location.longitude;
                this.query.latitude = this.location.latitude;
                await this.browse();
            });
        })
    }

    async browse(){
        this.remarks = await this.remarkService.browse(this.query);
    }
}
