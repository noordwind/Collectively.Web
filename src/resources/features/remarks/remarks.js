import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import FiltersService from 'resources/services/filters-service';
import LoaderService from 'resources/services/loader-service';
import ToastService from 'resources/services/toast-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, LocationService, RemarkService, FiltersService, LoaderService, ToastService, EventAggregator)
export class Remarks {
    constructor(router, locationService, remarkService, filtersService, loader, toast, eventAggregator) {
        this.router = router;
        this.locationService = locationService;
        this.remarkService = remarkService;
        this.filtersService = filtersService;
        this.loader = loader;
        this.toast = toast;
        this.eventAggregator = eventAggregator;
        this.radius = 1000;
        this.location = {};
        this.query = {
            radius: this.radius
        };
        this.remarks = [];
        this.mapLoadedSubscription = null;
        this.filters = this.filtersService.filters;
    }

    async activate(){
        this.mapLoadedSubscription = await this.eventAggregator.subscribe('map:loaded', async response => {
            this.loader.display();
            await this.toast.info("Fetching the remarks...");
            this.locationService.getLocation(async location => {
                this.location = location.coords;
                this.query.longitude = this.location.longitude;
                this.query.latitude = this.location.latitude;
                await this.browse();
                this.loader.hide();
                await this.toast.success("Remarks have been fetched.");
            });
        });
    }

    detached() {
        this.mapLoadedSubscription.dispose();
    }

    async browse(){
        this.query.results = this.filters.results;
        this.query.radius = this.filters.radius;
        this.remarks = await this.remarkService.browse(this.query);
    }
}
