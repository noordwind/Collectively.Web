import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import TranslationService from 'resources/services/translation-service';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import FiltersService from 'resources/services/filters-service';
import LoaderService from 'resources/services/loader-service';
import ToastService from 'resources/services/toast-service';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import SignalRService from 'resources/services/signalr-service';
import FileStore from 'resources/services/file-store';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, TranslationService, LocationService, RemarkService,
FiltersService, LoaderService, ToastService, AuthService,
UserService, SignalRService, FileStore, EventAggregator)
export class Remarks {
  constructor(router, translationService, location, remarkService, filtersService, loader, toast,
  authService, userService, signalRService, fileStore, eventAggregator) {
    self = this;
    this.router = router;
    this.translationService = translationService;
    this.location = location;
    this.remarkService = remarkService;
    this.filtersService = filtersService;
    this.loader = loader;
    this.toast = toast;
    this.authService = authService;
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
    this.page = 1;
    this.results = 25;
    this.remarks = [];
    this.mapRemarks = [];
    this.selectedRemark = null;
    this.mapLoadedSubscription = null;
    this.signalR.initialize();
    this.loadingRemarks = false;
  }

  async activate(params) {
    this.location.startUpdating();
    this.account = {userId: ''};
    this.isAuthenticated = this.authService.isLoggedIn;
    if (this.isAuthenticated) {
      this.account = await this.userService.getAccount();
    }
    this.filtersEnabled = this.isAuthenticated;
    this.createRemarkEnabled = this.isAuthenticated;
    this.selectedRemarkId = params.id;
  }

  get resetPositionEnabled() {
    return this.isAuthenticated && this.mapEnabled;
  }

  async attached() {
    this.fileInput = document.getElementById('file');
    $('#file').change(async () => {
      this.image = this.files[0];
    });
    this.mapLoadedSubscription = await this.subscribeMapLoaded();
    this.remarkCreatedSubscription = await this.subscribeRemarkCreated();
    this.remarkResolvedSubscription = await this.subscribeRemarkResolved();
    this.remarkDeletedSubscription = await this.subscribeRemarkDeleted();
    await this.browseForList(this.page);
  }

  detached() {
    this.mapLoadedSubscription.dispose();
    this.remarkCreatedSubscription.dispose();
    this.remarkResolvedSubscription.dispose();
    this.remarkDeletedSubscription.dispose();
  }

  async browseForMap() {
    this.query.results = this.filters.results;
    this.query.radius = this.filters.radius;
    self.mapRemarks = await this.browse(this.query);
  }

  async browseForList(page, results, clear = false) {
    let query = this.query;
    query.radius = 0;
    query.page = page || 0;
    query.results = results || 25;
    let remarks = await this.browse(query, !clear);
    if (clear) {
      this.remarks = [];
    }
    remarks.forEach(remark => {
      if (this.remarks.includes(remark)) {
        return;
      }
      this.remarks.push(remark);
    }, this);
  }

  async browse(query, cache = true) {
    query.authorId = '';
    if (this.filters.type === 'mine') {
      query.authorId = this.account.userId;
    }
    let remarks = await this.remarkService.browse(query, cache);
    remarks.forEach(remark => this.processRemark(remark), this);
    remarks = this.sortRemarks(remarks);

    return remarks;
  }

  async refreshList() {
    if (this.loadingRemarks) {
      return;
    }
    this.loadingRemarks = true;
    this.page = 1;
    await this.browseForList(this.page, this.results, true);
    this.loader.hide();
    this.loadingRemarks = false;
  }

  async loadMore() {
    if (this.loadingRemarks) {
      return;
    }
    if (this.page * this.results > this.remarks.length) {
      return;
    }
    this.loadingRemarks = true;
    this.loader.display();
    this.page++;
    await this.browseForList(this.page);
    this.loader.hide();
    this.loadingRemarks = false;
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
        this.toast.error(this.translationService.trCode('invalid_file'));
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
    await self.browseForMap();
  }

  get mapEnabled() {
    return this.filters.map.enabled;
  }

  set mapEnabled(value) {
    this.filters.map.enabled = value;
    this._updateFilters();
  }

  resetPosition() {
    this.filters.center = this.filters.defaultCenter;
    this._updateFilters();
    this.eventAggregator.publish('location:reset-center', this.filters.center)
  }

  _updateFilters() {
    this.filtersService.filters = this.filters;
  }

  async subscribeMapLoaded() {
    return await self.eventAggregator
      .subscribe('map:loaded', async response => {
        self.loader.display();
        await self.browseForMap();
        self.loader.hide();
      });
  }

  async subscribeRemarkCreated() {
    return await self.eventAggregator
      .subscribe('remark:created', async message => {
        let location = {
          latitude: message.location.coordinates[1],
          longitude: message.location.coordinates[0]
        };
        let remark = self.processRemark(message);
        if (self.location.isInRange(location, self.filters.radius)) {
          self.mapRemarks = self.insertRemark(self.mapRemarks, remark);
        }
        let lastRemark = self.remarks.length > 0
          ? self.remarks[self.remarks.length - 1]
          : null;
        if (lastRemark && self.location.isInRange(location, lastRemark.distance)) {
          self.remarks = self.insertRemark(self.remarks, remark, true);
        }
      });
  }

  async subscribeRemarkResolved() {
    return await self.eventAggregator
      .subscribe('remark:resolved', async message => {
        self.remarks = self.markAsResolved(self.remarks, message);
        self.mapRemarks = self.markAsResolved(self.mapRemarks, message);
      });
  }

  async subscribeRemarkDeleted() {
    return await self.eventAggregator
      .subscribe('remark:deleted', async message => {
        self.remarks = self.removeRemark(self.remarks, message.remarkId);
        self.mapRemarks = self.removeRemark(self.mapRemarks, message.remarkId);
      });
  }

  sortRemarks(remarks) {
    if (Array.isArray(remarks) === false) {
      remarks = [];
    }
    return remarks.sort((x, y) => {
      if (x.distance < y.distance) {
        return -1;
      }
      if (x.distance > y.distance) {
        return 1;
      }
      return 0;
    });
  }

  insertRemark(remarks, remark, sort) {
    if (Array.isArray(remarks) === false) {
      remarks = [];
    }
    if (remarks.includes(remark)) {
      return remarks;
    }
    remarks.push(remark);
    sort = sort || false;
    if (sort) {
      remarks = self.sortRemarks(remarks);
    }
    return Array.from(remarks);
  }

  markAsResolved(remarks, message) {
    if (Array.isArray(remarks) === false) {
      return [];
    }
    let index = remarks.findIndex(r => r.id === message.remarkId);
    if (index < 0) {
      return remarks;
    }
    let remark = remarks[index];
    remark.resolved = true;
    remark.resolver = {
      name: message.resolver,
      userId: message.resolverId
    };
    remark.resolvedAt = message.resolvedAt;
    remarks[index] = remark;

    return Array.from(remarks);
  }

  removeRemark(remarks, remarkId) {
    if (Array.isArray(remarks) === false) {
      return [];
    }
    let index = remarks.findIndex(r => r.id === remarkId);
    if (index < 0) {
      return remarks;
    }
    remarks.splice(index, 1);

    return Array.from(remarks);
  }
}
