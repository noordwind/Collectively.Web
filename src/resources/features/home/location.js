import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import TranslationService from 'resources/services/translation-service';
import LocationService from 'resources/services/location-service';
import FiltersService from 'resources/services/filters-service';
import LoaderService from 'resources/services/loader-service';
import ToastService from 'resources/services/toast-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, I18N, TranslationService, LocationService, FiltersService,
LoaderService, ToastService, EventAggregator)
export class Location {
  constructor(router, i18n, translationService, locationService, filtersService, loader, toast, eventAggregator) {
    this.router = router;
    this.i18n = i18n;
    this.translationService = translationService;
    this.locationService = locationService;
    this.filtersService = filtersService;
    this.filters = this.filtersService.filters;
    this.loader = loader;
    this.toast = toast;
    this.eventAggregator = eventAggregator;
  }

  async activate() {
    this.locationService.clear();
    this.loader.display();
    this.toast.info(this.translationService.tr('location.fetching_location_message'));
    await this.locationService.getLocation(async location => {
      let latitude = location.coords.latitude;
      let longitude = location.coords.longitude;
      this.filters.center = {latitude, longitude};
      this.filters.defaultCenter = {latitude, longitude};
      this.filtersService.filters = this.filters;
      this.toast.success(this.translationService.tr('location.location_loaded'));
      this.loader.hide();
      this.router.navigateToRoute('remarks');
    }, async error => {
      this.eventAggregator.publish('location:error');
    }, true);
  }
}
