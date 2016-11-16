import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ValidationControllerFactory,
  ValidationRules,
  validateTrigger  } from 'aurelia-validation';
import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';
import UserService from '../../services/user-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';

@inject(Router,
  ValidationControllerFactory,
  UserService,
  ToastService,
  LoaderService)
export class SignIn {
  constructor(router, controllerFactory, userService, toast, loader) {
    this.router = router;
    this.userService = userService;
    this.account = {
      email: '',
      password: '',
      provider: 'coolector'
    };
    this.toast = toast;
    this.loader = loader;
    this.sending = false;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.validateTrigger = validateTrigger.blur;
    this.controller.addRenderer(new MaterializeFormValidationRenderer());

    ValidationRules
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
    this.toast.info('Signing in, please wait...');
    let response = await this.userService.signIn(this.account);
    console.log(response);
    if (response.sessionId && response.token && response.key) {
      console.log("ok");
      this.loader.hide();
      // this.router.navigateToRoute('remarks');

      return;
    }

    this.sending = false;
    this.loader.hide();
    this.toast.error('Invalid credentials.');
  }
}
