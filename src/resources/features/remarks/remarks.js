import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import FiltersService from 'resources/services/filters-service';
import LoaderService from 'resources/services/loader-service';
import ToastService from 'resources/services/toast-service';
import UserService from 'resources/services/user-service';
import FileStore from 'resources/services/file-store';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, LocationService, RemarkService, FiltersService, LoaderService, ToastService, 
UserService, FileStore, EventAggregator)
export class Remarks {
  constructor(router, location, remarkService, filtersService, loader, toast, 
  userService, fileStore, eventAggregator) {
    self = this;
    this.router = router;
    this.location = location;
    this.remarkService = remarkService;
    this.filtersService = filtersService;
    this.loader = loader;
    this.toast = toast;
    this.userService = userService;
    this.fileStore = fileStore;
    this.eventAggregator = eventAggregator;
    this.files = [];
    this.filters = this.filtersService.filters;
    this.query = {
      radius: this.filters.radius,
      longitude: this.location.current.longitude,
      latitude: this.location.current.latitude,
      categories: encodeURI(this.filters.categories)
    };
    this.remarks = [];
    this.mapLoadedSubscription = null;
  }

  async activate() {
    this.location.startUpdating();
    this.user = await this.userService.getAccount();
  }

  async attached() {
    this.fileInput = document.getElementById('file');
    $('#file').change(async () => {
      this.image = this.files[0];
    });
    this.mapLoadedSubscription = await this.eventAggregator.subscribe('map:loaded',
            async response => {
              this.loader.display();
              await this.toast.info('Fetching the remarks...');
              await this.browse();
              await this.toast.success('Remarks have been fetched.');
              this.loader.hide();
            });
  }

  detached() {
    this.mapLoadedSubscription.dispose();
  }

  async browse() {
    this.query.results = this.filters.results;
    this.query.radius = this.filters.radius;
    this.remarks = await this.remarkService.browse(this.query);
  }

  displayCamera() {
    this.fileInput.click();
  }

  async resized(base64) {
    if (base64 === '') {
      return;
    }
    await self.navigateToCreateRemark(base64);
  }

  async navigateToCreateRemark(base64Image) {
    let reader = new FileReader();
    let file = self.image;
    reader.onload = async () => {
      if (file.type.indexOf('image') < 0) {
        await self.toast.error('Selected photo is invalid.');

        return;
      }
      let photo = {
        base64: base64Image,
        name: file.name,
        contentType: file.type
      };
      this.fileStore.current = photo;
      this.router.navigate('remarks/create');
    };
    reader.readAsDataURL(file);
  }
}
