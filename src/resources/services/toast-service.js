import {inject} from 'aurelia-framework';
import { MdToastService } from 'aurelia-materialize-bridge';

@inject(MdToastService)
export default class ToastService {
  constructor(toast) {
    this.toast = toast;
    this.defaultTime = 4090;
  }

  async log(message, time = 4000) {
    await this._display(message);
  }

  async info(message, time = 4000) {
    await this._display(message, 'blue', time);
  }

  async error(message, time = 4000) {
    await this._display(message, 'red', time);
  }

  async warn(message, time = 4000) {
    await this._display(message, 'yellow', time);
  }

  async success(message, time = 4000) {
    await this._display(message, 'green', time);
  }

  async _display(message, color, time) {
    if (typeof time === 'undefined') {
      time = this.defaultTime;
    }

    await this.toast.show(message, time, color);
  }
}
