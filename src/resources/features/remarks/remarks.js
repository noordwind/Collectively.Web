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
import LogService from 'resources/services/log-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, TranslationService, LocationService, RemarkService,
FiltersService, LoaderService, ToastService, AuthService,
UserService, SignalRService, LogService, EventAggregator)
export class Remarks {
  constructor(router, translationService, location,
  remarkService, filtersService, loader, toast, authService,
  userService, signalRService, logService, eventAggregator) {
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
    this.log = logService;
    this.eventAggregator = eventAggregator;
    this.files = [];
    this.query = {
      radius: this.filtersService.filters.radius,
      longitude: this.location.current.longitude,
      latitude: this.location.current.latitude,
      categories: encodeURI(this.filtersService.filters.categories),
      state: this.filtersService.filters.state,
      disliked: this.filtersService.filters.disliked
    };
    this.page = 1;
    this.results = 25;
    this.remarks = [];
    this.mapRemarks = [];
    this.selectedRemark = null;
    this.mapLoadedSubscription = null;
    this.signalR.initialize();
    this.loadingRemarks = false;
    this.mapEnabled = this.filtersService.filters.map.enabled;
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
    this.log.trace('remarks_activated', {
      filters: this.filtersService.filters,
      location: this.location.current
    });
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
    this.log.trace('remarks_attached', {filters: this.filtersService.filters});
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
    this.query.results = this.filtersService.filters.results;
    this.query.radius = this.filtersService.filters.radius;
    this.mapRemarks = await this.browse(this.query);
  }

  async browseForList(page, results, clear = false) {
    let query = {
      radius: 0,
      longitude: this.location.current.longitude,
      latitude: this.location.current.latitude,
      categories: encodeURI(this.filtersService.filters.categories),
      state: this.filtersService.filters.state,
      disliked: this.filtersService.filters.disliked,
      page: page || 0,
      results: results || 25
    };
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
    if (this.filtersService.filters.type === 'mine') {
      query.authorId = this.account.userId;
    }
    let remarks = await this.remarkService.browse(query, cache);
    remarks.forEach(remark => this.processRemark(remark), this);

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

    this.filtersService.setCenter({latitude, longitude});
    this.filtersService.setMapEnabled(true);

    return remark;
  }

  navigateToCreateRemark() {
    this.router.navigate('remarks/create');
  }

  async radiusChanged(radius, center) {
    this.filtersService.setRadius(radius);
    this.query.longitude = center.lng();
    this.query.latitude = center.lat();
    await this.browseForMap();
  }

  get mapEnabled() {
    return this.filtersService.filters.map.enabled;
  }

  set mapEnabled(value) {
    this.filtersService.setMapEnabled(value);
  }

  toggleMapEnabled() {
    this.mapEnabled = !this.mapEnabled;
  }

  resetPosition() {
    this.location.getLocation(l => {
      this.filtersService.setDefaultCenter({latitude: l.coords.latitude, longitude: l.coords.longitude});
      this.filtersService.setCenter(this.filtersService.filters.defaultCenter);
      this.eventAggregator.publish('location:reset-center', this.filtersService.filters.center);
    });
  }

  async subscribeMapLoaded() {
    return await this.eventAggregator
      .subscribe('map:loaded', async response => {
        this.loader.display();
        if (this.filtersService.filters.map.follow) {
          this.resetPosition();
        }
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
        if (this.location.isInRange(location, this.filtersService.filters.radius)) {
          this.mapRemarks = this.insertRemark(this.mapRemarks, remark);
        }
        let lastRemark = this.remarks.length > 0
          ? this.remarks[this.remarks.length - 1]
          : null;
        if (lastRemark && this.location.isInRange(location, lastRemark.distance)) {
          this.remarks = this.insertRemark(this.remarks, remark);
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
      .subscribe('remark:photo_added', async message => {
        this.remarks = this.updatePhotos(this.remarks, message);
      });
  }

  async subscribeRemarkPhotoRemoved() {
    return await this.eventAggregator
      .subscribe('remark:photo_removed', async message => {
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

  insertRemark(remarks, remark) {
    if (Array.isArray(remarks) === false) {
      remarks = [];
    }
    if (remarks.includes(remark)) {
      return remarks;
    }
    remarks.push(remark);

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
