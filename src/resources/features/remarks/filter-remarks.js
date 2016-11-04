import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import FiltersService from 'resources/services/filters-service';
import ToastService from 'resources/services/toast-service';
import RemarkService from 'resources/services/remark-service';

@inject(Router, LocationService, FiltersService, ToastService, RemarkService)
export class FilterRemarks {
  constructor(router, locationService, filtersService, toast, remarkService) {
    this.router = router;
    this.location = locationService;
    this.filtersService = filtersService;
    this.toast = toast;
    this.remarkService = remarkService;
    this.filters = this.filtersService.filters;
  }

  async activate() {
    this.location.startUpdating();
    await this.setupCategoriesFilter();
    this.setupStateFilter();
    this.setupTypeFilter();
  }

  resetFilters() {
    this.categories.forEach(c => c.checked = true);
    this.filters = this.filtersService.defaultFilters;
    this.filtersService.filters = this.filters;
  }

  filterRemarks() {
    this.filters.categories = this.selectedCategories;
    this.filtersService.filters = this.filters;
    this.router.navigateBack();
  }

  get selectedCategories() {
    return $.grep(this.categories, c => c.checked)
            .map(c => c.name);
  }

  async setupCategoriesFilter() {
    let self = this;
    let categories = await this.remarkService.getCategories();
    categories.forEach(c => {
      if (typeof(self.filters.categories) === 'undefined' || self.filters.categories.length === 0) {
        c.checked = true;
      } else {
        c.checked = self.filters.categories.indexOf(c.name) !== -1;
      }
    });
    self.categories = categories;
  }

  setupStateFilter() {
    this.states = ['active', 'resolved', 'all'];
  }

  setupTypeFilter() {
    this.types = ['all', 'mine'];
  }
}
