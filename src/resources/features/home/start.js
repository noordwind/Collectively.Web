import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import FacebookService from 'resources/services/facebook-service';

@inject(Router, I18N, FacebookService, ToastService, LoaderService)
export class Start {
  constructor(router, i18n, facebookService, toast, loader) {
    this.router = router;
    this.i18n = i18n;
    this.language = i18n.i18next.language;
    this.toast = toast;
    this.loader = loader;
    this.facebookService = facebookService.init();
    this.sending = false;
  }

  facebookSignIn() {
    this.sending = true;
    this.loader.display();
    this.facebookService.login(() => {
      this.loader.hide();
      this.router.navigateToRoute('location');

      return;
    }, () => {
      this.loader.hide();
      this.sending = false;
    });
  }
}
