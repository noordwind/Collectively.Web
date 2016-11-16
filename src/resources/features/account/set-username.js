import { inject } from 'aurelia-framework';
import { Router, Redirect } from 'aurelia-router';
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
export class SetUsername {
  controller = null;
  username = '';
  sending = false;

  constructor(router, controllerFactory, userService, toast, loader) {
    this.router = router;
    this.userService = userService;
    this.account = {};
    this.toast = toast;
    this.loader = loader;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.validateTrigger = validateTrigger.blur;
    this.controller.addRenderer(new MaterializeFormValidationRenderer());

    ValidationRules.customRule(
      'username',
      async (value, obj) => await this.validateUsername(value), 'This name is already used!'
    );

    ValidationRules
      .ensure('username')
        .required()
          .withMessage('Username is required!')
        .minLength(4)
        .satisfiesRule('username')
      .on(this);
  }

  async canActivate(params, routeConfig, $navigationInstruction) {
    this.account = await this.userService.getAccount();
    if (this.account.state !== 'incomplete') {
      return new Redirect('');
    }
    return true;
  }

  activate() {
  }

  async validateUsername(name) {
    if (!name) {
      return true;
    }
    let result = await this.userService.isNameAvailable(name);

    return result.isAvailable;
  }

  async submit() {
    let errors = await this.controller.validate();
    if (errors.length > 0) {
      return;
    }
    this.loader.display();
    this.sending = true;
    this.toast.info('Changing username, please wait...');
    let nameChanged = await this.userService.changeUsername(this.username);
    if (nameChanged) {
      this.toast.success('Your name is updated.');
      await this.userService.getAccount(false);
      this.loader.hide();
      this.router.navigateToRoute('remarks');
      return;
    }

    this.toast.error('There was an error, please try again.');
    this.sending = false;
    this.loader.hide();
  }

}
