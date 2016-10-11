import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import UserService from 'resources/services/user-service';

@inject(Router, UserService)
export class Home {
    constructor(router, userService) {
        this.router = router;
        this.userService = userService;
    }

    async activate(){
        let user = await this.userService.getAccount();
        this.userRemarksUrl = this.router.generate("user-remarks", {name : user.name});
    }
}
