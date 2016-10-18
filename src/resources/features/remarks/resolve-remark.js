import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';

@inject(Router, LocationService, RemarkService, ToastService, LoaderService)
export class ResolveRemark {
    constructor(router, location, remarkService, toast, loader) {
        this.router = router;
        this.location = location;
        this.remarkService = remarkService;
        this.toast = toast;
        this.loader = loader;
        this.files = [];
        this.remark = {};
        this.command = {};
        this.isSending = false;
    }

    async activate(params){
        let remarkId = params.id;
        this.remark = await this.remarkService.getRemark(remarkId);        
        this.command.remarkId = remarkId;
        this.command.latitude = this.location.current.latitude;
        this.command.longitude = this.location.current.longitude;
    }

    async resolveRemark(){
        let self = this;
        var file = this.files[0];
        if(typeof file === "undefined"){
            self.toast.error("Please select a photo.");
            return;
        }

        let reader = new FileReader();
        reader.onload = () => {
            self.command.photo = {
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
            self.remarkService.resolveRemark(self.command)
                .then(response => {
                    self.toast.success("Your request is processed.");
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
