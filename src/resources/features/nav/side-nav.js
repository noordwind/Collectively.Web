import {inject, bindable} from 'aurelia-framework';
import AuthService from 'resources/services/auth-service';

@inject(AuthService)
export class SideNav {
  @bindable router = null;

  constructor(authService) {
    this.authService = authService;
  }

  attached() {
    $('.button-sidenav-left').off('click').sideNav({
      edge: 'left',
      closeOnClick: true
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateToRoute('start');
  }

  get navigation() {
    let customNav = [];
    for (let navModel of this.router.navigation) {
      if (!((this.authService.isLoggedIn && navModel.settings.navHideAfterLogin ) ||
                 (!this.authService.isLoggedIn && navModel.settings.reqLogin ))) {
        customNav.push(navModel);
      }
    }
    return customNav;
  }
}
