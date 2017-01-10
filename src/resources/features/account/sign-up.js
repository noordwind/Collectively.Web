import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import TranslationService from 'resources/services/translation-service';
import { ValidationControllerFactory,
  ValidationRules,
  validateTrigger  } from 'aurelia-validation';
import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';
import UserService from '../../services/user-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import OperationService from 'resources/services/operation-service';

@inject(Router, I18N, TranslationService, ValidationControllerFactory, UserService,
  ToastService, LoaderService, OperationService)
export class SignUp {
  constructor(router, i18n, translationService, controllerFactory, userService,
    toast, loader, operationService) {
    this.router = router;
    this.i18n = i18n;
    this.translationService = translationService;
    this.userService = userService;
    this.account = {};
    this.toast = toast;
    this.loader = loader;
    this.operationService = operationService;
    this.account = {
      email: '',
      password: '',
      name: '',
      provider: 'coolector'
    };
    this.sending = false;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.validateTrigger = validateTrigger.blur;
    this.controller.addRenderer(new MaterializeFormValidationRenderer());

    ValidationRules
      .ensure('name')
        .required()
          .withMessage(this.translationService.tr('account.name_is_required'))
        .minLength(2)
          .withMessage(this.translationService.tr('account.name_is_invalid'))
        .maxLength(50)
          .withMessage(this.translationService.tr('account.name_is_invalid'))
        .matches(/^(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9._.-]+[a-zA-Z0-9]$/)
          .withMessage(this.translationService.tr('account.name_is_invalid'))
      .ensure('email')
        .required()
          .withMessage(this.translationService.tr('account.email_is_required'))
        .email()
          .withMessage(this.translationService.tr('account.email_is_invalid'))
        .maxLength(100)
          .withMessage(this.translationService.tr('account.email_is_invalid'))
      .ensure('password')
        .required()
          .withMessage(this.translationService.tr('account.password_is_required'))
        .minLength(4)
          .withMessage(this.translationService.tr('account.password_is_invalid'))
        .maxLength(100)
          .withMessage(this.translationService.tr('account.password_is_invalid'))
      .on(this.account);
  }

  attached() {
    this.operationService.subscribe('sign_up',
      operation => this.handleSignedUp(operation),
      operation => this.handleSignUpRejected(operation));
  }

  detached() {
    this.operationService.unsubscribeAll();
  }

  async submit() {
    let errors = await this.controller.validate();
    if (errors.length > 0) {
      return;
    }

    this.loader.display();
    this.sending = true;
    this.toast.info(this.translationService.tr('account.creating_account'));
    await this.userService.signUp(this.account);
  }

  handleSignedUp(operation) {
    this.toast.success(this.translationService.tr('account.account_created'));
    this.loader.hide();
    this.router.navigateToRoute('sign-in');
  }

  handleSignUpRejected(operation) {
    this.toast.error(this.translationService.trCode(operation.code));
    this.sending = false;
    this.loader.hide();
  }
}
