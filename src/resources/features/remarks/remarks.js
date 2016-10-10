import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import LoaderService from 'resources/services/loader-service';
import ToastService from 'resources/services/toast-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, LocationService, RemarkService, LoaderService, ToastService, EventAggregator)
export class Remarks {
    constructor(router, locationService, remarkService, loader, toast, eventAggregator) {
        this.router = router;
        this.locationService = locationService;
        this.remarkService = remarkService;
        this.loader = loader;
        this.toast = toast;
        this.eventAggregator = eventAggregator;
        this.radius = 1000;
        this.location = {};
        this.query = {
            radius: this.radius
        };
        this.remarks = [];
    }

    async activate(){
        this.loader.display();
        await this.eventAggregator.subscribe('map:loaded', async response => {
            this.toast.info("Fetching the remarks...");
            this.locationService.getLocation(async location => {
                this.location = location.coords;
                this.query.longitude = this.location.longitude;
                this.query.latitude = this.location.latitude;
                await this.browse();
                this.loader.hide();
                this.toast.info("Remarks have been fetched.");
            });
        })
    }

    async browse(){
        this.remarks = await this.remarkService.browse(this.query);
    }
}
