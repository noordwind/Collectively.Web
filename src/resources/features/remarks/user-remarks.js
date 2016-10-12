import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import UserService from 'resources/services/user-service';
import RemarkService from 'resources/services/remark-service';
import ToastService from 'resources/services/toast-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, UserService, RemarkService, ToastService, EventAggregator)
export class UserRemarks {
    constructor(router, userService, remarkService, toastService, eventAggregator){
        this.router = router;
        this.userService = userService;
        this.remarkService = remarkService;
        this.toastService = toastService;
        this.eventAggregator = eventAggregator;
        this.query = {
            authorId : "",
            results : 10
        };
    }

    async activate(params) {
        let name = params.name;
        let user = await this.userService.getAccountByName(name);
        this.user = user;
        this.query.authorId = user.userId;
        await this.browse();
    }

    async browse(){
        let remarks = await this.remarkService.browse(this.query);
        remarks.forEach(function(remark) {
            remark.url = this.router.generate("remark", {id : remark.id});
        }, this);
        this.remarks = remarks;
    }
}