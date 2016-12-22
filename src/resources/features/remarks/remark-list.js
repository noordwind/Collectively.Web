import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import {EventAggregator} from 'aurelia-event-aggregator';
import TranslationService from 'resources/services/translation-service';
import LocationService from 'resources/services/location-service';

@inject(Router, I18N, TranslationService, EventAggregator, LocationService)
export class RemarkList {
  @bindable remarks = [];
  @bindable loadMore = null;
  @bindable refresh = null;

  constructor(router, i18n, translationService, eventAggregator, locationService) {
    this.router = router;
    this.i18n = i18n;
    this.translationService = translationService;
    this.eventAggregator = eventAggregator;
    this.locationService = locationService;
    this.locationLoadedSubscription = null;
  }

  async activate() {
  }

  async attached() {
    this.locationLoadedSubscription = await this.eventAggregator
      .subscribe('location:loaded', async message => {
        if (this.remarks && this.remarks.length > 0) {
          this.remarks.forEach(r => {
            let location = {
              latitude: r.location.coordinates[1],
              longitude: r.location.coordinates[0]
            };
            r.distance = this.locationService.calculateDistance(location);
            r.hasPhoto = r.smallPhotoUrl !== '';
          });
        }
      });
  }

  detached() {
    this.locationLoadedSubscription.dispose();
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
