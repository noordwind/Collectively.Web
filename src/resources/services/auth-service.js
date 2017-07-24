import {inject} from 'aurelia-framework';
import StorageService from 'resources/services/storage-service';
import environment from '../../environment';
import * as moment from 'moment';

@inject(StorageService)
export default class AuthService {
  constructor(storageService) {
    this.storageService = storageService;
    this.environment = environment;
  }

  get token() {
    if (this.session && moment.unix(this.session.expires) > moment.utc()) {
      return this.session.token;
    }

    return '';
  }

  get session() {
    return this.storageService.read(this.environment.sessionStorageKey);
  }

  set session(newSession) {
    this.storageService.write(this.environment.sessionStorageKey, newSession);
  }

  removeSession() {
    this.storageService.delete(this.environment.sessionStorageKey);
  }

  get isLoggedIn() {
    return this.session && !!this.session.token;
  }

  get provider() {
    return this.isLoggedIn ? this.session.provider : '';
  }

  logout() {
    this.storageService.deleteAll();
  }
}
