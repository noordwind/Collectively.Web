import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import UserService from 'resources/services/user-service';
import LocationService from 'resources/services/location-service';
import LoaderService from 'resources/services/loader-service';
import ToastService from 'resources/services/toast-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, UserService, LocationService, LoaderService, ToastService, EventAggregator)
export class Home {
    constructor(router, userService, location, loader, toast, eventAggregator) {
        this.router = router;
        this.userService = userService;
        this.location = location;
        this.loader = loader;
        this.toast = toast;
        this.eventAggregator = eventAggregator;
    }

    async activate(){
        this.location.startUpdating();
        this.user = await this.userService.getAccount();
    }
}
