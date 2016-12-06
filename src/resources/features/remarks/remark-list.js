import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import TranslationService from 'resources/services/translation-service';

@inject(Router, I18N, TranslationService)
export class RemarkList {
  @bindable remarks = [];
  @bindable loadMore = null;
  @bindable refresh = null;

  constructor(router, i18n, translationService) {
    this.router = router;
    this.i18n = i18n;
    this.translationService = translationService;
  }

  async activate() {
  }

  remarksChanged(newValue) {
    newValue.forEach(remark => {
      remark.categoryName = this.translationService.tr(`remark.category_${remark.category}`);
    });
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
