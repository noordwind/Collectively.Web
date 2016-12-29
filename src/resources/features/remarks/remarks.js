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
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, TranslationService, LocationService, RemarkService,
FiltersService, LoaderService, ToastService, AuthService,
UserService, SignalRService, EventAggregator)
export class Remarks {
  constructor(router, translationService, location, remarkService, filtersService, loader, toast,
  authService, userService, signalRService, eventAggregator) {
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
    this.remarkPhotosAddedSubscription = await this.subscribeRemarkPhotosAdded();
    this.remarkPhotoRemovedSubscription = await this.subscribeRemarkPhotoRemoved();
    await this.browseForList(this.page);
  }

  detached() {
    this.mapLoadedSubscription.dispose();
    this.remarkCreatedSubscription.dispose();
    this.remarkResolvedSubscription.dispose();
    this.remarkDeletedSubscription.dispose();
    this.remarkPhotosAddedSubscription.dispose();
    this.remarkPhotoRemovedSubscription.dispose();
  }

  async browseForMap() {
    this.query.results = this.filters.results;
    this.query.radius = this.filters.radius;
    this.mapRemarks = await this.browse(this.query);
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

  navigateToCreateRemark() {
    this.router.navigate('remarks/create');
  }

  async radiusChanged(radius, center) {
    this.filters.radius = radius;
    this.query.longitude = center.lng();
    this.query.latitude = center.lat();
    await this.browseForMap();
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
    return await this.eventAggregator
      .subscribe('map:loaded', async response => {
        this.loader.display();
        await this.browseForMap();
        this.loader.hide();
      });
  }

  async subscribeRemarkCreated() {
    return await this.eventAggregator
      .subscribe('remark:created', async message => {
        let location = {
          latitude: message.location.coordinates[1],
          longitude: message.location.coordinates[0]
        };
        let remark = this.processRemark(message);
        if (this.location.isInRange(location, this.filters.radius)) {
          this.mapRemarks = this.insertRemark(this.mapRemarks, remark);
        }
        let lastRemark = this.remarks.length > 0
          ? this.remarks[this.remarks.length - 1]
          : null;
        if (lastRemark && this.location.isInRange(location, lastRemark.distance)) {
          this.remarks = this.insertRemark(this.remarks, remark, true);
        }
      });
  }

  async subscribeRemarkResolved() {
    return await this.eventAggregator
      .subscribe('remark:resolved', async message => {
        this.remarks = this.markAsResolved(this.remarks, message);
        this.mapRemarks = this.markAsResolved(this.mapRemarks, message);
      });
  }

  async subscribeRemarkDeleted() {
    return await this.eventAggregator
      .subscribe('remark:deleted', async message => {
        this.remarks = this.removeRemark(this.remarks, message.remarkId);
        this.mapRemarks = this.removeRemark(this.mapRemarks, message.remarkId);
      });
  }

  async subscribeRemarkPhotosAdded() {
    return await this.eventAggregator
      .subscribe('remark:photoAdded', async message => {
        this.remarks = this.updatePhotos(this.remarks, message);
      });
  }

  async subscribeRemarkPhotoRemoved() {
    return await this.eventAggregator
      .subscribe('remark:photoRemoved', async message => {
        this.remarks = this.removeAndUpdateRemarkPhoto(this.remarks, message);
      });
  }

  removeAndUpdateRemarkPhoto(remarks, message) {
    if (Array.isArray(remarks) === false) {
      return [];
    }
    let index = remarks.findIndex(r => r.id === message.remarkId);
    if (index < 0) {
      return remarks;
    }
    let remark = remarks[index];
    let photoUri = remark.smallPhotoUrl.split('/');
    let photoName = photoUri[photoUri.length - 1];
    if (Array.isArray(message.photos) && message.photos.includes(photoName)) {
      remark.smallPhotoUrl = '';
      remarks[index] = remark;
      return Array.from(remarks);
    }

    return remarks;
  }

  updatePhotos(remarks, message) {
    if (Array.isArray(remarks) === false) {
      return [];
    }
    if (message.photosCount > 1) {
      return remarks;
    }

    let index = remarks.findIndex(r => r.id === message.remarkId);
    if (index < 0) {
      return remarks;
    }

    let remark = remarks[index];
    let photo = message.newPhotos.find(p => p.size === 'small');
    remark.smallPhotoUrl = photo.url;
    remarks[index] = remark;

    return Array.from(remarks);
  }

  sortRemarks(remarks) {
    if (Array.isArray(remarks) === false) {
      remarks = [];
    }
    return remarks.sort((x, y) => Number(x.distance) - Number(y.distance));
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
      remarks = this.sortRemarks(remarks);
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
