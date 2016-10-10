import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import FiltersService from 'resources/services/filters-service';
import ToastService from 'resources/services/toast-service';

@inject(Router, LocationService, FiltersService, ToastService)
export class FilterRemarks {
    constructor(router, locationService, filtersService, toast) {
        this.router = router;
        this.locationService = locationService;
        this.filtersService = filtersService;
        this.toast = toast;
        this.filters = this.filtersService.filters;
    }

    resetFilters(){
        this.filters = this.filtersService.defaultFilters;
        this.filtersService.filters = this.filters;
    }

    filterRemarks(){
        this.filtersService.filters = this.filters;
        this.router.navigate('remarks');
    }
}
