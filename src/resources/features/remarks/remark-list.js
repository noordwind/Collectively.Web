import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class RemarkList {
    @bindable remarks = [];
    @bindable loadMore = null;

  constructor(router) {
    this.router = router;
  }

  async activate() {
  }

  getMore(scrollContext) {
    if (this.loadMore !== null) {
      this.loadMore();
    }
  }
}
