import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import TranslationService from 'resources/services/translation-service';
import LocationService from 'resources/services/location-service';
import FiltersService from 'resources/services/filters-service';
import RemarkService from 'resources/services/remark-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import SignalRService from 'resources/services/signalr-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import Environment from '../../../environment';

@inject(Router, I18N, TranslationService,
LocationService, FiltersService, RemarkService,
ToastService, LoaderService, AuthService, UserService,
SignalRService, EventAggregator, Environment)
export class Remark {
  constructor(router, i18n, translationService, location, filtersService, remarkService,
  toastService, loader, authService, userService, signalR, eventAggregator, environment) {
    self = this;
    this.router = router;
    this.i18n = i18n;
    this.translationService = translationService;
    this.location = location;
    this.filtersService = filtersService;
    this.filters = this.filtersService.filters;
    this.remarkService = remarkService;
    this.toast = toastService;
    this.loader = loader;
    this.authService = authService;
    this.userService = userService;
    this.signalR = signalR;
    this.eventAggregator = eventAggregator;
    this.feature = environment.feature;
    this.remark = {};
    this.isDeleting = false;
    this.isSending = false;
    this.isInRange = false;
    this.signalR.initialize();
  }

  get canDelete() {
    return this.isAuthenticated && this.account.userId === this.remark.author.userId;
  }

  get canResolve() {
    return this.isAuthenticated && this.remark.resolved === false && (this.feature.resolveRemarkLocationRequired === false || this.isInRange);
  }

  get canAddPhotos() {
    return this.isAuthenticated && this.account.userId === this.remark.author.userId && this.remark.photos.length < 15;
  }

  async activate(params, routeConfig) {
    this.location.startUpdating();
    this.id = params.id;
    this.account = {userId: ''};
    this.isAuthenticated = this.authService.isLoggedIn;
    if (this.isAuthenticated) {
      this.account = await this.userService.getAccount();
    }
    await this.loadRemark();
  }

  async loadRemark() {
    let remark = await this.remarkService.getRemark(this.id);
    this.remark = remark;
    this.remark.categoryName = this.translationService.tr(`remark.category_${this.remark.category.name}`);
    this.resolvedMediumPhoto = remark.photos.find(x => x.size === 'medium' && x.metadata === 'resolved');
    this.resolvedBigPhoto = remark.photos.find(x => x.size === 'big' && x.metadata === 'resolved');
    let smallPhotos = remark.photos.filter(x => x.size === 'small');
    let mediumPhotos = remark.photos.filter(x => x.size === 'medium');
    let bigPhotos = remark.photos.filter(x => x.size === 'big');
    this.photos = smallPhotos.map((photo, index) => {
      return {
        small: photo.url,
        medium: mediumPhotos[index].url,
        big: bigPhotos[index].url
      };
    });
    //TODO: Map photos and group them by size.
    this.state = remark.resolved ? 'resolved' : 'new';
    this.stateName = this.translationService.tr(`remark.state_${this.state}`);
    this.latitude = remark.location.coordinates[1];
    this.longitude = remark.location.coordinates[0];
    this.isInRange = this.location.isInRange({
      latitude: this.latitude,
      longitude: this.longitude
    });
  }

  async attached() {
    this.fileInput = document.getElementById('new-image');
    $('#new-image').change(async () => {
      this.newImage = this.files[0];
    });
    this.remarkResolvedSubscription = await this.eventAggregator
      .subscribe('remark:resolved', async message => {
        if (this.id !== message.remarkId) {
          return;
        }
        this.state = 'resolved';
        this.remark.resolved = true;
        this.remark.resolver = {
          name: message.resolver,
          userId: message.resolverId
        };
        this.remark.resolvedAt = message.resolvedAt;
        if (this.account.userId !== this.remark.resolver.userId) {
          this.toast.success(this.translationService.tr('remark.remark_resolved'));
        }
      });
    this.remarkDeletedSubscription = await this.eventAggregator
      .subscribe('remark:deleted', async message => {
        if (this.id !== message.remarkId) {
          return;
        }
        if (this.account.userId !== this.remark.author.userId) {
          this.toast.info(this.translationService.tr('remark.remark_removed_by_author'));
          this.router.navigateToRoute('remarks');
        }
      });
  }

  detached() {
    this.remarkResolvedSubscription.dispose();
    this.remarkDeletedSubscription.dispose();
  }

  display() {
    this.filters.center.latitude = this.latitude;
    this.filters.center.longitude = this.longitude;
    this.filters.map.enabled = true;
    this.filtersService.filters = this.filters;
    this.router.navigateToRoute('display-remark', {id: this.id});
  }

  displayCamera() {
    this.fileInput.click();
  }

  async delete() {
    if (this.canDelete === false) {
      await this.toast.error(this.translationService.tr('remark.not_allowed_to_delete'));

      return;
    }
    this.loader.display();
    this.isDeleting = true;
    this.toast.info(this.translationService.tr('remark.removing_remark'));
    let remarkRemoved = await this.remarkService.deleteRemark(this.id);
    if (remarkRemoved.success) {
      this.toast.success(this.translationService.tr('remark.remark_removed'));
      this.loader.hide();
      this.router.navigateToRoute('remarks');

      return;
    }

    this.isDeleting = false;
    this.toast.error(remarkRemoved.message);
    this.loader.hide();
  }

  async resolve() {
    let command = {
      remarkId: this.remark.id,
      latitude: this.location.current.latitude,
      longitude: this.location.current.longitude
    };
    this.isSending = true;
    this.loader.display();
    this.toast.info(this.translationService.tr('remark.resolving_remark'));
    let remarkResolved = await this.remarkService.resolveRemark(command);
    if (remarkResolved.success) {
      this.toast.success(this.translationService.tr('remark.remark_resolved'));
      this.loader.hide();
      this.router.navigateToRoute('remarks');

      return;
    }

    this.toast.error(remarkResolved.message);
    this.isSending = false;
    this.loader.hide();
  }

  async newImageResized(base64) {
    if (base64 === '') {
      return;
    }
    await self.addPhotos(base64);
  }

  async addPhotos(base64Image) {
    this.isSending = true;
    this.loader.display();
    this.toast.info(this.translationService.tr('remark.adding_photo'));
    let reader = new FileReader();
    let file = this.newImage;
    reader.onload = async () => {
      if (file.type.indexOf('image') < 0) {
        this.toast.error(this.translationService.trCode('invalid_file'));
        this.loader.hide();
        this.isSending = false;

        return;
      }
      let photo = {
        base64: base64Image,
        name: file.name,
        contentType: file.type
      };

      let photos = {
        photos: [photo]
      };

      let addedPhotos = await this.remarkService.addPhotos(this.remark.id, photos);
      if (addedPhotos.success) {
        this.loader.hide();
        this.isSending = false;
        await this.toast.success(this.translationService.tr('remark.added_photo'));
        location.reload();

        return;
      }

      this.toast.error(addedPhotos.message);
      this.isSending = false;
      this.loader.hide();
    };
    reader.readAsDataURL(file);
  }
}
