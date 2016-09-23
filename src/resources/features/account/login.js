import {inject} from 'aurelia-framework';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import {Router} from 'aurelia-router';

@inject(AuthService, UserService, Router)
export class Login {
    constructor(authService, userService, router) {
        this.authService = authService;
        this.userService = userService;
        this.router = router;
        let self = this;
        this.lock = authService.getAuth0Lock();
        authService.authenticateViaAuth0(this.lock,
            function(authResult, profile) {
                self.userService.signIn(authResult.accessToken)
                    .then(authResponse => {self.redirectToDashboard()});
            });
    }

    redirectToDashboard() {
        this.lock.hide();
        this.router.navigate("");
    }

    login() {
        this.lock.show();   
    }
}
