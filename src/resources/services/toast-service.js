import {inject} from 'aurelia-framework';
import { MdToastService } from 'aurelia-materialize-bridge';

@inject(MdToastService)
export default class ToastService {
  constructor(toast) {
    this.toast = toast;
    this.defaultTime = 4000;
  }

  async log(message) {
    await this._display(message);
  }

  async info(message) {
    await this._display(message, 'blue');
  }

  async error(message) {
    await this._display(message, 'red');
  }

  async warn(message) {
    await this._display(message, 'yellow');
  }

  async success(message) {
    await this._display(message, 'green');
  }

  async _display(message, color, time) {
    if (typeof time === 'undefined') {
      time = this.defaultTime;
    }

    await this.toast.show(message, time, color);
  }
}
