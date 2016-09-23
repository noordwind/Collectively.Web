import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import AuthService from 'resources/services/auth-service';

@inject(AuthService)
export default class AuthorizeStep {
    constructor(authService) {
        this.authService = authService;
    }

    run(navigationInstruction, next) {
        if (navigationInstruction.getAllInstructions().some(i => i.config.settings && i.config.settings.reqLogin)) {
            if (!this.authService.isLoggedIn) {
                return next.cancel(new Redirect('login'));
            }
        }
        return next();
    }
}
