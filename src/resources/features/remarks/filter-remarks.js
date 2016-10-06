import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';

@inject(Router, LocationService, RemarkService, ToastService, LoaderService)
export class FilterRemarks {
    constructor(router, locationService, remarkService, toast, loader) {
        this.router = router;
        this.locationService = locationService;
        this.remarkService = remarkService;
        this.toast = toast;
        this.loader = loader;
    }

    async activate(){
    }

    async filterRemarks(){
    }
}
