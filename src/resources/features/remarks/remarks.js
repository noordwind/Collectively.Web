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
    constructor(router, location, remarkService, filtersService, loader, toast, eventAggregator) {
        this.router = router;
        this.location = location;
        this.remarkService = remarkService;
        this.filtersService = filtersService;
        this.loader = loader;
        this.toast = toast;
        this.eventAggregator = eventAggregator;
        this.radius = 1000;

        //Temporary workaround, issue with API number formats.
        var longitude = Math.round(this.location.current.longitude);
        var latitude = Math.round(this.location.current.latitude);
        this.query = {
            radius: this.radius,
            longitude: longitude,
            latitude: latitude
        };
        this.remarks = [];
        this.mapLoadedSubscription = null;
        this.filters = this.filtersService.filters;
    }

    async activate(){
        this.mapLoadedSubscription = await this.eventAggregator.subscribe('map:loaded', async response => {
            this.loader.display();
            await this.toast.info("Fetching the remarks...");
            await this.browse();
            this.loader.hide();
            await this.toast.success("Remarks have been fetched.");
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
