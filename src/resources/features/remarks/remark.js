import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import ToastService from 'resources/services/toast-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import environment from '../../../environment';

@inject(Router, LocationService, RemarkService, ToastService, EventAggregator)
export class Remark {
    constructor(router, locationService, remarkService, toastService, eventAggregator) {
        this.router = router;
        this.locationService = locationService;
        this.remarkService = remarkService;
        this.toast = toastService;
        this.eventAggregator = eventAggregator;
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
        await this.remarkService.deleteRemark(this.id);
    }
}
