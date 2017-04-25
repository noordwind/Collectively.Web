import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import FiltersService from 'resources/services/filters-service';
import RemarkService from 'resources/services/remark-service';

@inject(Router, FiltersService, RemarkService)
export class RemarkAdded {
  constructor(router, filtersService, remarkService) {
    this.router = router;
    this.filtersService = filtersService;
    this.remarkService = remarkService;
  }

  activate(params) {
    this.id = params.id;
  }

  async attached() {
    let remark = await this.remarkService.getRemark(this.id);
    this.latitude = remark.location.coordinates[1];
    this.longitude = remark.location.coordinates[0];
  }

  display() {
    this.filtersService.setCenter({latitude: this.latitude, longitude: this.longitude});
    this.router.navigateToRoute('display-remark', {id: this.id});
  }
}
