import { inject } from 'aurelia-framework';
import { Router, Redirect } from 'aurelia-router';
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

@inject(Router, I18N, TranslationService, ValidationControllerFactory,
  UserService, ToastService, LoaderService, OperationService)
export class SetUsername {
  controller = null;
  username = '';
  sending = false;

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
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.validateTrigger = validateTrigger.blur;
    this.controller.addRenderer(new MaterializeFormValidationRenderer());

    // ValidationRules.customRule(
    //   'username',
    //   async (value, obj) => await this.validateUsername(value), this.translationService.tr('account.name_in_use')
    // );

    // ValidationRules
    //   .ensure('username')
    //     .required()
    //       .withMessage(this.translationService.tr('account.name_is_required'))
    //     .minLength(4)
    //       .withMessage(this.translationService.tr('account.name_is_invalid'))
    //     .satisfiesRule('username')
    //       .withMessage(this.translationService.tr('account.name_is_invalid'))
    //     .matches(/^(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9._.-]+[a-zA-Z0-9]$/)
    //       .withMessage(this.translationService.tr('account.name_is_invalid'))
    //   .on(this);
  }

  async canActivate(params, routeConfig, $navigationInstruction) {
    this.account = await this.userService.getAccount(false);
    if (this.account.state !== 'incomplete') {
      return new Redirect('');
    }
    return true;
  }

  attached() {
    this.operationService.subscribe('change_username',
      async operation => await this.handleUsernameChanged(operation),
      operation => this.handleChangeUsernameRejected(operation));
  }

  detached() {
    this.operationService.unsubscribeAll();
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
    this.toast.info(this.translationService.tr('account.changing_your_name'));
    this.username = this.username.replace(/\s/g, '');
    await this.userService.changeUsername(this.username);
  }

  async handleUsernameChanged(operation) {
    this.toast.success(this.translationService.tr('account.name_changed'));
    await this.userService.getAccount(false);
    this.loader.hide();
    this.router.navigateToRoute('location');
  }

  handleChangeUsernameRejected(operation) {
    this.toast.error(this.translationService.trCode(operation.code));
    this.sending = false;
    this.loader.hide();
  }
}
