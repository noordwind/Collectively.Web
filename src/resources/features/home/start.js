import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import FacebookService from 'resources/services/facebook-service';

@inject(Router, FacebookService, ToastService, LoaderService)
export class Start {
  constructor(router, facebookService, toast, loader) {
    this.router = router;
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
      this.router.navigateToRoute('remarks');

      return;
    }, () => {
      this.loader.hide();
      this.sending = false;
    });
  }
}
