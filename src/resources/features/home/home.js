import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import UserService from 'resources/services/user-service';
import LocationService from 'resources/services/location-service';

@inject(Router, UserService, LocationService)
export class Home {
    constructor(router, userService, location) {
        this.router = router;
        this.userService = userService;
        this.location = location;
    }

    async activate(){
        this.user = await this.userService.getAccount();
    }
}
