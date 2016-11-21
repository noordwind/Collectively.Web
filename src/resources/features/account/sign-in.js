import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ValidationControllerFactory,
  ValidationRules,
  validateTrigger  } from 'aurelia-validation';
import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';
import AuthService from '../../services/auth-service';
import UserService from '../../services/user-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';

@inject(Router, ValidationControllerFactory, AuthService,
  UserService, ToastService, LoaderService)
export class SignIn {
  constructor(router, controllerFactory, authService, userService, toast, loader) {
    this.router = router;
    this.authService = authService;
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
    let session = await this.userService.signIn(this.account);
    if (session.token) {
      this.authService.session = {
        sessionId: session.sessionId,
        sessionKey: session.sessionKey,
        token: session.token,
        expiry: session.expiry,
        key: session.key,
        provider: 'coolector'
      };
      this.loader.hide();
      this.router.navigateToRoute('location');

      return;
    }

    this.sending = false;
    this.loader.hide();
    this.toast.error('Invalid credentials.');
  }
}
