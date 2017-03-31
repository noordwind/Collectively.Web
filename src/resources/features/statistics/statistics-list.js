import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class StatisticsList {
  @bindable headerColumn1 = '';
  @bindable headerColumn2 = '';
  @bindable items = [];

  constructor(router) {
    this.router = router;
  }

  navigate(item) {
    if (item.url) {
      this.router.navigate(item.url);
    }
  }
}
