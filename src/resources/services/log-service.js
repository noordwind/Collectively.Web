import {inject} from 'aurelia-framework';
import environment from '../../environment';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';

@inject(AuthService, UserService)
export default class LogService {
  logLevels = {
    trace: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5
  }

  constructor(authService, userService) {
    this.authService = authService;
    this.userService = userService;
    this.environment = environment;
  }

  async _log(level, message, object) {
    if (this.logLevels[level] < this.logLevels[this.environment.logLevel]) {
      return false;
    }
    let user = '';
    if (this.authService.isLoggedIn) {
      user = await this.userService.getAccount();
    }
    const logObject = {
      type: level,
      prefix: message,
      url: location.href,
      hostname: location.hostname,
      agent: navigator.userAgent,
      username: user ? user.name : '',
      data: {}
    };
    if (object) {
      logObject.message = object.message || '';
      if (object.stack) {
        logObject.stack = object.stack;
      }
      logObject.data = object;
    }
    _LTracker.push(logObject);
  }

  trace(message, object) {
    this._log('trace', message, object);
  }

  debug(message, object) {
    this._log('debug', message, object);
  }

  info(message, object) {
    this._log('info', message, object);
  }

  error(message, object) {
    this._log('error', message, object);
  }
}
