import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import AuthService from 'resources/services/auth-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import environment from '../../../environment';

@inject(Router, LocationService, RemarkService, ToastService, LoaderService, AuthService, EventAggregator)
export class Remark {
    constructor(router, locationService, remarkService, toastService, loader, authService, eventAggregator) {
        this.router = router;
        this.locationService = locationService;
        this.remarkService = remarkService;
        this.toast = toastService;
        this.loader = loader;
        this.authService = authService;
        this.eventAggregator = eventAggregator;
        this.isDeleting = false;
    }

    get canDelete(){
        let profile = JSON.parse(this.authService.profile);

        return profile.user_id === this.author.userId;
    }

    async activate(params, routeConfig){
        this.id = params.id;
        let remark = await this.remarkService.getRemark(this.id);
        this.author = remark.author;
        this.category = remark.category;
        this.description = remark.description;
        this.location = remark.location;
        this.imageSource = `${environment.apiUrl}remarks/${this.id}/photo`;
    }

    async delete(){
        if(this.canDelete == false)
        {
            await this.toast.error("I'm sorry. You are not allowed to delete remark!")
            return;    
        }
        this.loader.display();
        this.isDeleting = true;
        await this.remarkService.deleteRemark(this.id);
        await this.toast.info('Delete request was sent, please wait...');
        this.isDeleting = false;
        this.loader.hide();
        this.router.navigate("remarks");
    }
}
