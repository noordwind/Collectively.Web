import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import TranslationService from 'resources/services/translation-service';
import UserService from 'resources/services/user-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import {Router} from 'aurelia-router';

@inject(I18N, TranslationService, UserService,
ToastService, LoaderService, Router)
export class Users {
  constructor(i18n, translationService, userService,
  toastService, loaderService, router) {
    this.i18n = i18n;
    this.translationService = translationService;
    this.userService = userService;
    this.toastService = toastService;
    this.loaderService = loaderService;
    this.router = router;
    this.query = { };
    this.loading = false;
  }

  async activate() {
    this.query = {
      page: 1,
      results: 10
    }
    this.users = await this.browse();
  }

  async loadMore() {
    if (this.users.length < this.query.results * this.query.page) {
      return;
    }
    if (this.loading === false) {
      this.loading = true;
      this.query.page += 1;
      let users = await this.browse();
      users.forEach(x => this.users.push(x));
      this.loading = false;
    }
  }

  async browse() {
    let users = await this.userService.browse(this.query);
    users.forEach(x => 
    {
      if(x.avatarUrl === null || x.avatarUrl === '') {
        x.avatarUrl = 'assets/images/user_placeholder.png';
      }
    });

    return users;
  }
}
