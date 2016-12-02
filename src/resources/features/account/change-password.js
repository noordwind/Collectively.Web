import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import { ValidationControllerFactory,
  ValidationRules,
  validateTrigger  } from 'aurelia-validation';
import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import TranslationService from 'resources/services/translation-service';
import {Router} from 'aurelia-router';

@inject(I18N, AuthService, UserService, ToastService, TranslationService,
LoaderService, ValidationControllerFactory, Router)
export class ChangePassword {
  constructor(i18n, authService, userService, toast, translationService, loader, controllerFactory, router) {
    this.i18n = i18n;
    this.language = i18n.i18next.language;
    this.authService = authService;
    this.userService = userService;
    this.toast = toast;
    this.translationService = translationService;
    this.loader = loader;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.validateTrigger = validateTrigger.blur;
    this.controller.addRenderer(new MaterializeFormValidationRenderer());
    this.router = router;
    this.sending = false;
    this.currentPassword = '';
    this.newPassword = '';

    ValidationRules
      .ensure('currentPassword')
        .required()
          .withMessage(this.translationService.tr('account.current_password_is_required'))
        .minLength(4)
          .withMessage(this.translationService.tr('account.current_password_is_invalid'))
        .maxLength(100)
          .withMessage(this.translationService.tr('account.current_password_is_invalid'))
      .ensure('newPassword')
        .required()
          .withMessage(this.translationService.tr('account.new_password_is_required'))
        .minLength(4)
          .withMessage(this.translationService.tr('account.new_password_is_invalid'))
        .maxLength(100)
          .withMessage(this.translationService.tr('account.new_password_is_invalid'))
      .on(this);
  }

  canActivate() {
    if (this.authService.provider === 'coolector') {
      return true;
    }

    return new Redirect('');
  }

  async activate() {
    let userProfile = await this.userService.getAccount();
    this.username = userProfile.name;
  }

  async submit() {
    let errors = await this.controller.validate();
    if (errors.length > 0) {
      this.sending = false;

      return;
    }

    this.loader.display();
    this.sending = true;
    this.toast.info(this.translationService.tr('account.changing_your_password'));
    let passwordChanged = await this.userService.changePassword(
      this.currentPassword, this.newPassword);
    if (passwordChanged.success) {
      this.toast.success(this.translationService.tr('account.password_changed'));
      this.loader.hide();
      this.router.navigateToRoute('profile');

      return;
    }

    this.sending = false;
    this.loader.hide();
    this.toast.error(this.translationService.trCode(passwordChanged.code));
  }
}
