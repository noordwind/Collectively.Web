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
      radius: 200,
      results: 100,
      categories: [],
      type: 'all',
      state: 'active',
      map: {
        enabled: true,
        zoomLevel: 15
      }
    };
  }

  get filters() {
    return this.storageService.read(this.environment.filtersStorageKey);
  }

  set filters(newFilters) {
    this.storageService.write(this.environment.filtersStorageKey, newFilters);
  }
}
