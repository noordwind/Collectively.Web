import {inject} from 'aurelia-framework';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import {Router} from 'aurelia-router';

@inject(AuthService, UserService, Router)
export class Profile {
  constructor(authService, userService, router) {
    this.authService = authService;
    this.userService = userService;
    this.router = router;
    this.sending = false;
  }

  async activate() {
    let userProfile = await this.userService.getAccount();
    this.username = userProfile.name;
  }

  get isCoolectorAccount() {
    return this.authService.provider === 'coolector';
  }
}
