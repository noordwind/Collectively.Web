import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';

@inject(Router, LocationService, RemarkService, ToastService, LoaderService)
export class CreateRemark {
    constructor(router, locationService, remarkService, toast, loader) {
        this.router = router;
        this.locationService = locationService;
        this.remarkService = remarkService;
        this.toast = toast;
        this.loader = loader;
        this.files = [];
        this.remark = {};
        this.isSending = false;
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
        if(typeof file === "undefined"){
            self.toast.error("Please select a photo.");
            return;
        }

        let reader = new FileReader();
        reader.onload = () => {
            self.remark.photo = {
                base64: reader.result,
                name: file.name,
                contentType: file.type
            };
            if(file.type.indexOf("image") < 0){
                self.toast.error("Selected photo is invalid.");
                return;
            }
            self.isSending = true;
            self.loader.display();
            self.remarkService.sendRemark(self.remark)
                .then(response => {
                    self.toast.success("Your remark has been sent.");
                    self.router.navigate('remarks');
                }, err => {
                    self.toast.error("There was an error, please try again.");
                    self.isSending = false;
                    self.loader.hide();
                });
        };
        reader.readAsDataURL(file);
    }
}
