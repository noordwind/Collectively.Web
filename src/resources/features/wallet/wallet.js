import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import UserService from 'resources/services/user-service';
import LoaderService from 'resources/services/loader-service';
import ToastService from 'resources/services/toast-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, UserService, LoaderService, ToastService, EventAggregator)
export class Wallet {
  constructor(router, userService, loader, toast, eventAggregator) {
    this.router = router;
    this.userService = userService;
    this.loader = loader;
    this.toast = toast;
    this.eventAggregator = eventAggregator;
  }

  async activate() {
    this.user = await this.userService.getAccount();
  }
}
