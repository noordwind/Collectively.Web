import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ValidationControllerFactory,
  ValidationRules,
  validateTrigger  } from 'aurelia-validation';
// import { MaterializeFormValidationRenderer } from 'aurelia-materialize-bridge';
import UserService from '../../services/user-service';

@inject(Router, ValidationControllerFactory, UserService)
export class SetUsername {
  controller = null;
  username = '';

  constructor(router, controllerFactory, userService) {
    this.router = router;
    this.userService = userService;
    this.account = {};
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.validateTrigger = validateTrigger.blur;
    // this.controller.addRenderer(new MaterializeFormValidationRenderer());

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

  async activate() {
    this.account = await this.userService.getAccount();
    this.username = this.account.name;
  }

  get displayForm() {
    return this.account.name ? false : true;
  }

  async validateUsername(name) {
    if (!name) {
      return;
    }
    let result = await this.userService.isNameAvailable(name);

    return result.isAvailable;
  }

  async submit() {
    let errors = await this.controller.validate();
    console.log(errors);
  }

}
