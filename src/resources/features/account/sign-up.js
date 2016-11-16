import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ValidationControllerFactory,
  ValidationRules,
  validateTrigger  } from 'aurelia-validation';
import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';
import UserService from '../../services/user-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';

@inject(Router, ValidationControllerFactory, UserService, ToastService, LoaderService)
export class SignUp {
  constructor(router, controllerFactory, userService, toast, loader) {
    this.router = router;
    this.userService = userService;
    this.account = {};
    this.toast = toast;
    this.loader = loader;
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
          .withMessage('Username is required!')
        .minLength(4)
      .ensure('email')
        .required()
          .withMessage('Email is required!')
        .email()
          .withMessage('Email is invalid!')
        .maxLength(100)
      .ensure('password')
        .required()
          .withMessage('Password is required!')
        .minLength(4)
        .maxLength(100)
      .on(this.account);
  }

  async submit() {
    let errors = await this.controller.validate();
    if (errors.length > 0) {
      this.sending = false;

      return;
    }

    this.loader.display();
    this.sending = true;
    this.toast.info('Creating your account, please wait...');
    let accountCreated = await this.userService.signUp(this.account);
    if (accountCreated.success) {
      this.toast.success('Your account has been created.');
      this.loader.hide();
      this.router.navigateToRoute('sign-in');
      return;
    }

    this.sending = false;
    this.loader.hide();
    this.toast.error(accountCreated.message);
  }
}
