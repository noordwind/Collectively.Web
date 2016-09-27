import {inject} from 'aurelia-framework';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import ToastService from 'resources/services/toast-service';
import {Router} from 'aurelia-router';

@inject(AuthService, UserService, ToastService, Router)
export class Login {
  constructor(authService, userService, toast, router) {
    this.authService = authService;
    this.userService = userService;
    this.router = router;
    this.toast = toast;
    let self = this;
    this.lock = authService.getAuth0Lock();
    authService.authenticateViaAuth0(this.lock,
        function(authResult, profile) {
          self.redirecting = true;
          self.userService.signIn(authResult.accessToken)
                .then(authResponse => {
                  self.toast.info('Welcome to the Coolector!');
                  self.redirectToDashboard();
                });
        });
  }

  redirectToDashboard() {
    this.lock.hide();
    this.router.navigate('');
  }

  login() {
    this.lock.show();
  }
}
