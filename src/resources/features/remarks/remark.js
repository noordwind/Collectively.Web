import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import environment from '../../../environment';

@inject(Router, LocationService, RemarkService, EventAggregator)
export class Remark {
    constructor(router, locationService, remarkService, eventAggregator) {
        this.router = router;
        this.locationService = locationService;
        this.remarkService = remarkService;
        this.eventAggregator = eventAggregator;
    }

    async activate(params, routeConfig){
        let id = params.id;
        let remark = await this.remarkService.getRemark(id);
        // let photo = await this.remarkService.getPhoto(id);
        // console.log(photo);

        this.author = remark.author;
        this.category = remark.category;
        this.description = remark.description;
        this.location = remark.location;
        this.imageSource = `${environment.apiUrl}remarks/${id}/photo`;
    }
}
