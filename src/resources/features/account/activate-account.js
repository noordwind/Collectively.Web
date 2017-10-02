import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import TranslationService from 'resources/services/translation-service';
import UserService from 'resources/services/user-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import OperationService from 'resources/services/operation-service';
import {Router} from 'aurelia-router';

@inject(I18N, TranslationService, UserService,
ToastService, LoaderService, OperationService, Router)
export class ActivateAccount {
  constructor(i18n, translationService, userService,
  toastService, loaderService, operationService, router) {
    this.i18n = i18n;
    this.translationService = translationService;
    this.userService = userService;
    this.toast = toastService;
    this.loader = loaderService;
    this.operationService = operationService;
    this.router = router;
  }

  activate(params, routeConfig, navigationInstruction) {
    this.email = params.email;
    this.token = params.token;
  }

  async attached() {
    this.operationService.subscribe('activate_account',
      operation => this.handleAccountActivated(operation),
      operation => this.handleRejectedOperation(operation));
  }

  async submit() {
    this.loader.display();
    this.sending = true;
    await this.userService.activateAccount(this.email, this.token);
  }

  handleAccountActivated(operation) {
    this.toast.info(this.translationService.tr('account.account_activated'));
    this.sending = false;
    this.loader.hide();
    this.router.navigateToRoute('sign-in');
  }

  handleRejectedOperation(operation) {
    this.toast.error(this.translationService.trCode(operation.code));
    this.sending = false;
    this.loader.hide();
  }
}
