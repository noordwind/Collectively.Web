import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';

@inject(Router, LocationService)
export class Remarks {
    constructor(router, locationService) {
        this.router = router;
        this.locationService = locationService;
    }

    async activate(){
    }
}
