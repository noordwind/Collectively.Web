import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import UserService from 'resources/services/user-service';
import RemarkService from 'resources/services/remark-service';
import LocationService from 'resources/services/location-service';
import ToastService from 'resources/services/toast-service';
import FiltersService from 'resources/services/filters-service';
import TranslationService from 'resources/services/translation-service';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(Router, UserService, RemarkService, LocationService,
ToastService, FiltersService, TranslationService, EventAggregator)
export class RemarkListPage {
  constructor(router, userService, remarkService, location,
  toastService, filterService, translationService, eventAggregator) {
    this.router = router;
    this.userService = userService;
    this.remarkService = remarkService;
    this.location = location;
    this.toastService = toastService;
    this.translationService = translationService;
    this.filters = filterService.filters;
    this.eventAggregator = eventAggregator;
    this.header = '';
    this.query = { };
    this.loading = false;
    this.orderBy = 'distance';
    this.sortOrder = 'ascending';
    this.skipLocation = false;
    this.remarks = [];
  }

  async activate(params) {
    this.location.startUpdating();
    if (params.username) {
      let user = await this.userService.getAccountByName(params.username);
      this.userId = user.userId || '';
      let header = this.translationService.trCapitalized('remark.user_remarks');
      this.header = `${header} ${params.username}`;
      this.orderBy = 'createdAt';
      this.sortOrder = 'descending';
      this.skipLocation = true;
    }

    let userFavorites = '';
    let favorites = params.type === 'favorites';
    if (favorites) {
      let header = this.translationService.trCapitalized('remark.favorite_remarks');
      this.header = `${header}: ${params.username}`;
      userFavorites = this.userId;
      this.skipLocation = true;
    }
    if (params.resolver) {
      let user = await this.userService.getAccountByName(params.resolver);
      this.resolverId = user.userId || '';
      let header = this.translationService.trCapitalized('remark.resolved_by');
      this.header = `${header} ${params.resolver}`;
      this.orderBy = 'createdAt';
      this.sortOrder = 'descending';
      this.skipLocation = true;
    }
    if (params.category) {
      let header = this.translationService.trCapitalized('remark.category');
      let category = this.translationService.trCapitalized(`remark.category_${params.category}`);
      this.header = `${header}: ${category}`;
    }
    if (params.tag) {
      let header = this.translationService.trCapitalized('tags.tag');
      let tag = params.tag;
      this.header = `${header}: ${tag}`;
    }
    this.query = {
      page: 1,
      results: 25,
      longitude: this.location.current.longitude || 0,
      latitude: this.location.current.latitude || 0,
      authorId: this.userId || '',
      resolverId: this.resolverId || '',
      categories: params.category || '',
      tags: params.tag || '',
      state: params.state || '',
      orderBy: this.orderBy,
      sortOrder: this.sortOrder,
      userFavorites: userFavorites,
      skipLocation: this.skipLocation
    };
    this.remarks = await this.browse();
  }

  async browse() {
    let remarks = await this.remarkService.browse(this.query);
    remarks.forEach(remark => {
      remark.url = this.router.generate('remark', { id: remark.id });
      remark.distance = this.location.calculateDistance({
        latitude: remark.location.coordinates[1],
        longitude: remark.location.coordinates[0]
      });
      remark.icon = `assets/images/${remark.category.name}_icon_dark.png`;
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
      remarks.forEach(x => this.remarks.push(x));
      this.loading = false;
    }
  }
}
