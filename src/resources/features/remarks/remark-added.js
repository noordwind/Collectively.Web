import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import FiltersService from 'resources/services/filters-service';

@inject(Router, FiltersService)
export class RemarkAdded {
  constructor(router, filtersService) {
    this.router = router;
    this.filtersService = filtersService;
  }

  activate(params) {
    this.id = params.id;
  }

  display() {
    this.router.navigateToRoute('display-remark', {id: this.id});
  }
}
