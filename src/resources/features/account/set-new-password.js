import {inject} from 'aurelia-framework';
import UserService from 'resources/services/user-service';
import { ValidationControllerFactory,
  ValidationRules,
  validateTrigger  } from 'aurelia-validation';
import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import {Router} from 'aurelia-router';

@inject(UserService, ToastService,
LoaderService, ValidationControllerFactory, Router)
export class SetNewPassword {
  constructor(userService, toast, loader, controllerFactory, router) {
    this.userService = userService;
    this.toast = toast;
    this.loader = loader;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.validateTrigger = validateTrigger.blur;
    this.controller.addRenderer(new MaterializeFormValidationRenderer());
    this.router = router;
    this.sending = false;
    this.password = '';

    ValidationRules
      .ensure('password')
        .required()
          .withMessage('Password is required!')
        .minLength(4)
        .maxLength(100)
      .on(this);
  }

  async activate(params) {
    this.email = params.email;
    this.token = params.token;
    if (!this.email || !this.token) {
      return new Redirect('');
    }
  }

  async submit() {
    let errors = await this.controller.validate();
    if (errors.length > 0) {
      this.sending = false;

      return;
    }

    this.loader.display();
    this.sending = true;
    this.toast.info('Setting new password, please wait...');
    let newPasswordSet = await this.userService.setNewPassword(
      this.email, this.token, this.password);
    if (newPasswordSet.success) {
      this.toast.success('New password has been set.');
      this.loader.hide();
      this.router.navigateToRoute('sign-in');

      return;
    }

    this.sending = false;
    this.loader.hide();
    this.toast.error(newPasswordSet.message);
  }
}
