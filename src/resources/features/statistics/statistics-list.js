import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class StatisticsList {
  @bindable header = '';
  @bindable items = [];

  constructor(router) {
    this.router = router;
  }

  itemsChanged() {
    if (Array.isArray(this.items) === false) {
      return;
    }
    this.items = this.items.sort((x, y) => Number(y.count) - Number(x.count));
  }
}
