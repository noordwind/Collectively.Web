import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import FiltersService from 'resources/services/filters-service';
import LoaderService from 'resources/services/loader-service';
import ToastService from 'resources/services/toast-service';
import UserService from 'resources/services/user-service';
import SignalRService from 'resources/services/signalr-service';
import FileStore from 'resources/services/file-store';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, LocationService, RemarkService,
FiltersService, LoaderService, ToastService,
UserService, SignalRService, FileStore, EventAggregator)
export class Remarks {
  constructor(router, location, remarkService, filtersService, loader, toast,
  userService, signalRService, fileStore, eventAggregator) {
    self = this;
    this.router = router;
    this.location = location;
    this.remarkService = remarkService;
    this.filtersService = filtersService;
    this.loader = loader;
    this.toast = toast;
    this.userService = userService;
    this.signalR = signalRService;
    this.fileStore = fileStore;
    this.eventAggregator = eventAggregator;
    this.files = [];
    this.filters = this.filtersService.filters;
    this.query = {
      radius: this.filters.radius,
      longitude: this.location.current.longitude,
      latitude: this.location.current.latitude,
      categories: encodeURI(this.filters.categories),
      state: this.filters.state
    };
    this.remarks = [];
    this.selectedRemark = null;
    this.mapLoadedSubscription = null;
    this.signalR.initialize();
  }

  async activate(params) {
    this.location.startUpdating();
    this.user = await this.userService.getAccount();
    this.selectedRemarkId = params.id;
  }

  async attached() {
    this.fileInput = document.getElementById('file');
    $('#file').change(async () => {
      this.image = this.files[0];
    });
    if (!this.mapEnabled) {
      await this.browse();
    }
    this.mapLoadedSubscription = await this.eventAggregator.subscribe('map:loaded',
            async response => {
              this.loader.display();
              await this.browse();
              this.loader.hide();
            });
  }

  detached() {
    this.mapLoadedSubscription.dispose();
  }

  async browse() {
    this.query.results = this.filters.results;
    this.query.radius = this.filters.radius;
    this.query.authorId = '';
    if (this.filters.type === 'mine') {
      this.query.authorId = this.user.userId;
    }
    this.remarks = await this.remarkService.browse(this.query);
    this.remarks.forEach(remark => this.processRemark(remark), this);
    this.remarks.sort((x, y) => {
      if (x.distance < y.distance) {
        return -1;
      }
      if (x.distance > y.distance) {
        return 1;
      }
      return 0;
    });
  }

  processRemark(remark) {
    remark.url = this.router.generate('remark', {id: remark.id});
    remark.selected = remark.id === this.selectedRemarkId;
    let latitude = remark.location.coordinates[1];
    let longitude = remark.location.coordinates[0];
    remark.distance = this.location.calculateDistance({
      latitude: latitude,
      longitude: longitude
    });

    if (!remark.selected) {
      return remark;
    }

    this.filters.center = {latitude, longitude};
    this.filters.map.enabled = true;
    this._updateFilters();

    return remark;
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
    this.loader.display();
    let reader = new FileReader();
    let file = self.image;
    reader.onload = async () => {
      if (file.type.indexOf('image') < 0) {
        await self.toast.error('Selected photo is invalid.');
        this.loader.hide();

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

  async radiusChanged(radius, center) {
    self.filters.radius = radius;
    self.query.longitude = center.lng();
    self.query.latitude = center.lat();
    await self.browse();
  }

  get mapEnabled() {
    return this.filters.map.enabled;
  }

  set mapEnabled(value) {
    this.filters.map.enabled = value;
    this._updateFilters();
  }

  _updateFilters() {
    this.filtersService.filters = this.filters;
  }
}
