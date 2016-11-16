import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';

@inject(AuthService, UserService)
export default class AuthorizeStep {
  constructor(authService, userService) {
    this.authService = authService;
    this.userService = userService;
  }

  async run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings && i.config.settings.reqLogin)) {
      if (!this.authService.isLoggedIn) {
        return next.cancel(new Redirect('sign-in'));
      }

      if (this.authService.isLoggedIn) {
        let account = await this.userService.getAccount();
        if (account.state !== 'incomplete') {
          return next();
        }
        if (navigationInstruction.fragment === '/profile/username') {
          return next();
        }
        return next.cancel(new Redirect('profile/username'));
      }
    }

    return next();
  }
}
