import {inject} from 'aurelia-framework';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import LocationService from 'resources/services/location-service';
import ToastService from 'resources/services/toast-service';
import {Router} from 'aurelia-router';

@inject(AuthService, UserService, LocationService, ToastService, Router)
export class Login {
  constructor(authService, userService, locationService, toast, router) {
    this.authService = authService;
    this.userService = userService;
    this.location = locationService;
    this.router = router;
    this.toast = toast;
    let self = this;
    this.lock = authService.getAuth0Lock();
    authService.authenticateViaAuth0(this.lock,
        function(authResult, profile) {
          self.redirecting = true;
          self.userService.signIn(authResult.accessToken)
                .then(authResponse => {
                  self.redirectToLocation();
                });
        });
  }

  redirectToLocation() {
    this.lock.hide();
    this.router.navigate('location');
  }

  login() {
    this.location.clear();
    this.lock.show();
  }
}
