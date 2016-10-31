import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import RemarkService from 'resources/services/remark-service';
import ToastService from 'resources/services/toast-service';
import FiltersService from 'resources/services/filters-service';
import LocationService from 'resources/services/location-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, RemarkService, ToastService, FiltersService, LocationService, EventAggregator)
export class NearestRemarks {
  constructor(router, remarkService, toastService, filtersService, locationService, eventAggregator) {
    this.router = router;
    this.remarkService = remarkService;
    this.toastService = toastService;
    this.eventAggregator = eventAggregator;
    this.location = locationService;
    this.filtersService = filtersService;
    this.filters = this.filtersService.filters;
    this.query = {
      results: this.filters.results,
      radius: this.filters.radius,
      longitude: this.location.current.longitude,
      latitude: this.location.current.latitude,
      nearest: true,
      categories: encodeURI(this.filters.categories)
    };
  }

  async activate() {
    await this.browse();
  }

  async browse() {
    let remarks = await this.remarkService.browse(this.query);
    remarks.forEach(function(remark) {
      remark.url = this.router.generate('remark', {id: remark.id});
      remark.smallPhoto = remark.photos.find(x => x.size === 'small');
      remark.distance = this.location.calculateDistance({
        latitude: remark.location.coordinates[1],
        longitude: remark.location.coordinates[0]
      });
    }, this);
    this.remarks = remarks;
  }
}
