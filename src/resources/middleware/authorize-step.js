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
    let requiresLogin = navigationInstruction.getAllInstructions().some(i => i.config.settings && i.config.settings.reqLogin);
    if (requiresLogin) {
      if (!this.authService.isLoggedIn) {
        return next.cancel(new Redirect(''));
      }
      //Having built-in GPS is no longer required to run the app.
      // if (!('geolocation' in navigator)) {
      //   return next.cancel(new Redirect(''));
      // }
      if (this.authService.isLoggedIn) {
        let account = await this.userService.getAccount();
        if (account.state === 'incomplete') {
          if (navigationInstruction.fragment === '/location') {
            return next();
          }
          if (navigationInstruction.fragment === '/profile/username') {
            return next();
          }
          return next.cancel(new Redirect('profile/username'));
        }
        if (navigationInstruction.fragment === '/' || navigationInstruction.fragment === '/profile/username') {
          return next.cancel(new Redirect('remarks'));
        }
      }
    }
    return next();
  }
}
