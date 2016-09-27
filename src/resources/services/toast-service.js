import {inject} from 'aurelia-framework';
import { MdToastService } from 'aurelia-materialize-bridge';

@inject(MdToastService)
export default class ToastService {
  constructor(toast) {
    this.toast = toast;
    this.defaultTime = 4000;
  }

  log(message) {
    this._display(message);
  }

  info(message) {
    this._display(message, 'blue');
  }

  error(message) {
    this._display(message, 'red');
  }

  warn(message) {
    this._display(message, 'yellow');
  }

  success(message) {
    this._display(message, 'green');
  }

  _display(message, color, time) {
    if (typeof time === 'undefined') {
      time = this.defaultTime;
    }

    this.toast.show(message, time, color);
  }
}
