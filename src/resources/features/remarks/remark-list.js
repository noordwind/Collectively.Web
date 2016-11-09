import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class RemarkList {
  @bindable remarks = [];
  @bindable loadMore = null;
  @bindable refresh = null;

  constructor(router) {
    this.router = router;
  }

  async activate() {
  }

  getMore(scrollContext) {
    if (scrollContext.isAtBottom && this.loadMore !== null) {
      this.loadMore();
    }

    if (scrollContext.isAtTop && this.refresh !== null) {
      this.refresh();
    }
  }
}
