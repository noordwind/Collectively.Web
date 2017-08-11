import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import TranslationService from 'resources/services/translation-service';
import UserService from 'resources/services/user-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import {Router} from 'aurelia-router';

@inject(I18N, TranslationService, UserService,
ToastService, LoaderService, Router)
export class ActivateAccount {
  constructor(i18n, translationService, userService,
  toastService, loaderService, router) {
    this.i18n = i18n;
    this.translationService = translationService;
    this.userService = userService;
    this.toastService = toastService;
    this.loaderService = loaderService;
    this.router = router;
  }

  activate(params, routeConfig, navigationInstruction) {
    this.email = params.email;
    this.token = params.token;
  }

  async submit() {
    this.loaderService.display();
    this.sending = true;
    await this.userService.activateAccount(this.email, this.token);
    this.toastService.info(this.translationService.tr('account.account_activated'));
    this.sending = false;
    this.loaderService.hide();
    this.router.navigateToRoute('sign-in');
  }
}
