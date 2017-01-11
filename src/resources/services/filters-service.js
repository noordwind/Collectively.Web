import {inject} from 'aurelia-framework';
import StorageService from 'resources/services/storage-service';
import environment from '../../environment';

@inject(StorageService)
export default class FiltersService {
  constructor(storageService) {
    this.storageService = storageService;
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
}
