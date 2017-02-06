import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import AuthService from 'resources/services/auth-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';

@inject(Router, I18N, AuthService, ToastService, LoaderService)
export class Start {
  constructor(router, i18n, authService, toast, loader) {
    this.router = router;
    this.i18n = i18n;
    this.authService = authService;
    this.language = i18n.i18next.language;
    this.toast = toast;
    this.loader = loader;
    this.sending = false;
  }

  canActivate() {
    if (this.authService.isLoggedIn && 'geolocation' in navigator) {
      this.router.navigateToRoute('remarks');

      return false;
    }

    return true;
  }

  activate() {
    this.authService.logout();
  }
}
