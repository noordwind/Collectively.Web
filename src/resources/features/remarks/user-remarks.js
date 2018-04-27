import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import UserService from 'resources/services/user-service';
import RemarkService from 'resources/services/remark-service';
import LocationService from 'resources/services/location-service';
import ToastService from 'resources/services/toast-service';
import FiltersService from 'resources/services/filters-service';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(Router, UserService, RemarkService, LocationService, ToastService, FiltersService, EventAggregator)
export class UserRemarks {
  constructor(router, userService, remarkService, location, toastService, filterService, eventAggregator) {
    this.router = router;
    this.userService = userService;
    this.remarkService = remarkService;
    this.location = location;
    this.toastService = toastService;
    this.filters = filterService.filters;
    this.eventAggregator = eventAggregator;
    this.query = {
      authorId: '',
      page: 1,
      results: 25,
      skipLocation: true
    };
    this.loading = false;
    this.remarks = [];
  }

  async activate(params) {
    this.location.startUpdating();
    let name = params.name;
    this.user = await this.userService.getAccountByName(name);
    this.query.authorId = this.user.userId;
    this.remarks = await this.browse();
  }

  async browse() {
    let remarks = await this.remarkService.browse(this.query);
    if (remarks === null) {
      remarks = [];
    }
    remarks.forEach(remark => {
      remark.url = this.router.generate('remark', { id: remark.id });
      remark.distance = this.location.calculateDistance({
        latitude: remark.location.coordinates[1],
        longitude: remark.location.coordinates[0]
      });
    }, this);

    return remarks;
  }

  async loadMore() {
    if (this.remarks.length < this.query.results * this.query.page) {
      return;
    }
    if (this.loading === false) {
      this.loading = true;
      this.query.page += 1;
      let remarks = await this.browse();
      if (remarks === null) {
        remarks = [];
      }
      remarks.forEach(x => this.remarks.push(x));
      this.loading = false;
    }
  }
}
