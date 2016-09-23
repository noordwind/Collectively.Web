import {inject, bindable} from 'aurelia-framework';
import AuthService from 'resources/services/auth-service';

@inject(AuthService)
export class NavBar {
  @bindable router = null;

    constructor(authService) {
        this.authService = authService;
    }

    attached() {
        $(".button-collapse").sideNav({
            closeOnClick: true
        });
    }

    logout() {
        this.authService.logout();   
        this.router.navigate("login");
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
