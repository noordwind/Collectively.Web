import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';

@inject(Router, LocationService, RemarkService)
export class CreateRemark {
    constructor(router, locationService, remarkService) {
        this.router = router;
        this.locationService = locationService;
        this.remarkService = remarkService;
        this.files = [];
        this.remark = {};
    }

    async activate(){
        let location = await this.locationService.getLocation(location => {
            this.location = location.coords;
            this.remark.latitude = location.coords.latitude;
            this.remark.longitude = location.coords.longitude;
        });
    }
    
    
    async sendRemark(){
        let self = this;
        var file = this.files[0];
        let reader = new FileReader();
        reader.onload = () => {
            self.remark.base64file = reader.result;
            self.remarkService.sendRemark(self.remark);
        };
        reader.readAsDataURL(file);
    }
}
