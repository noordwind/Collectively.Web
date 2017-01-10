import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import TranslationService from 'resources/services/translation-service';
import UserService from 'resources/services/user-service';
import { ValidationControllerFactory,
  ValidationRules,
  validateTrigger  } from 'aurelia-validation';
import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import {Router} from 'aurelia-router';

@inject(I18N, TranslationService, UserService, ToastService,
LoaderService, ValidationControllerFactory, Router)
export class ResetPassword {
  constructor(i18n, translationService, userService, toast, loader, controllerFactory, router) {
    this.i18n = i18n;
    this.translationService = translationService;
    this.userService = userService;
    this.toast = toast;
    this.loader = loader;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.validateTrigger = validateTrigger.blur;
    this.controller.addRenderer(new MaterializeFormValidationRenderer());
    this.router = router;
    this.sending = false;
    this.email = '';

    ValidationRules
      .ensure('email')
        .required()
          .withMessage(this.translationService.tr('account.email_is_required'))
        .email()
          .withMessage(this.translationService.tr('account.email_is_invalid'))
        .maxLength(100)
          .withMessage(this.translationService.tr('account.email_is_invalid'))
      .on(this);
  }

  async submit() {
    let errors = await this.controller.validate();
    if (errors.length > 0) {
      return;
    }

    this.loader.display();
    this.sending = true;
    await this.userService.resetPassword(this.email);
    this.toast.info(this.translationService.tr('account.reset_password_email_sent_message'));
    this.sending = false;
    this.loader.hide();
    this.router.navigateToRoute('sign-in');
  }
}
