import {inject} from 'aurelia-framework';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import { ValidationControllerFactory,
  ValidationRules,
  validateTrigger  } from 'aurelia-validation';
import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import {Router} from 'aurelia-router';

@inject(AuthService, UserService, ToastService,
LoaderService, ValidationControllerFactory, Router)
export class ChangePassword {
  constructor(authService, userService, toast, loader, controllerFactory, router) {
    this.authService = authService;
    this.userService = userService;
    this.toast = toast;
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
          .withMessage('Current password is required!')
        .minLength(4)
        .maxLength(100)
      .ensure('newPassword')
        .required()
          .withMessage('New password is required!')
        .minLength(4)
        .maxLength(100)
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
    this.toast.info('Changing your password, please wait...');
    let passwordChanges = await this.userService.changePassword(
      this.currentPassword, this.newPassword);
    if (passwordChanges.success) {
      this.toast.success('Your password has been changed.');
      this.loader.hide();
      this.router.navigateToRoute('profile');

      return;
    }

    this.sending = false;
    this.loader.hide();
    this.toast.error(passwordChanges.message);
  }
}
