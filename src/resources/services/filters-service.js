import environment from '../../environment';

export default class FiltersService {
  constructor() {
    this.environment = environment;
    if (this.filters === null || typeof this.filters === 'undefined') {
      this.filters = this.defaultFilters;
    }
  }

  get defaultFilters() {
    return {
      radius: 200,
      results: 100,
      categories: []
    };
  }

  get filters() {
    return JSON.parse(localStorage.getItem(this.environment.filtersStorageKey));
  }

  set filters(newFilters) {
    localStorage.setItem(this.environment.filtersStorageKey, JSON.stringify(newFilters));
  }
}
