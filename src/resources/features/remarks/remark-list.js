import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class RemarkList {
    @bindable remarks = [];

    constructor(router){
        this.router = router;
    }

    async activate() {
    }
}