import {inject} from 'aurelia-framework';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import FacebookService from 'resources/services/facebook-service';
import {Router} from 'aurelia-router';

@inject(AuthService, UserService, FacebookService, Router)
export class Profile {
  constructor(authService, userService, facebookService, router) {
    this.authService = authService;
    this.userService = userService;
    this.facebookService = facebookService;
    this.router = router;
    this.sending = false;
  }

  async activate() {
    let userProfile = await this.userService.getAccount();
    this.username = userProfile.name;
  }

  async postOnFacebookWall() {
    this.sending = true;
    await this.facebookService.postOnWall('Hello from Coolector.');
    this.sending = false;
  }

  get isCoolectorAccount() {
    return this.authService.provider === 'coolector';
  }
}
