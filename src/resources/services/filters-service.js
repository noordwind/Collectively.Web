import {inject} from 'aurelia-framework';
import StorageService from 'resources/services/storage-service';
import LogService from 'resources/services/log-service';
import environment from '../../environment';

@inject(StorageService, LogService)
export default class FiltersService {
  constructor(storageService, logService) {
    this.storageService = storageService;
    this.log = logService;
    this.environment = environment;
    if (this.filters === null || typeof this.filters === 'undefined') {
      this.filters = this.defaultFilters;
    }
  }

  get defaultFilters() {
    return {
      radius: 1000,
      results: 100000,
      categories: [],
      type: 'all',
      state: 'active',
      disliked: false,
      distinguishLiked: true,
      defaultCenter: {
        latitude: 0,
        longitude: 0
      },
      center: {
        latitude: 0,
        longitude: 0
      },
      map: {
        enabled: true,
        zoomLevel: 15
      }
    };
  }

  get filters() {
    let filters = this.storageService.read(this.environment.filtersStorageKey);
    if (filters !== null) {
      return filters;
    }
    this.storageService.write(this.environment.filtersStorageKey, this.defaultFilters);

    return this.defaultFilters;
  }

  set filters(newFilters) {
    this.storageService.write(this.environment.filtersStorageKey, newFilters);
  }

  setMapEnabled(value) {
    let filters = this.filters;
    filters.map.enabled = value;
    this.filters = filters;
    this.log.trace('filters_map_enabled_updated', {newValue: {enabled: value}, filters: this.filters});
  }

  setRadius(value) {
    let filters = this.filters;
    filters.radius = value;
    this.filters = filters;
  }

  setCenter(value) {
    let filters = this.filters;
    filters.center = value;
    this.filters = filters;
  }

  setDefaultCenter(value) {
    let filters = this.filters;
    filters.defaultCenter = value;
    this.filters = filters;
  }
}
