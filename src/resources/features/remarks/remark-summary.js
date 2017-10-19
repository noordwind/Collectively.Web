import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import TranslationService from 'resources/services/translation-service';
import RemarkService from 'resources/services/remark-service';
import OperationService from 'resources/services/operation-service';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import FeatureService from 'resources/services/feature-service';

@inject(ToastService, LoaderService, TranslationService,
 RemarkService, OperationService, AuthService,
 UserService, FeatureService, EventAggregator)
export class RemarkSummary {
  @bindable remark = null;
  @bindable createMode = false;
  @bindable displayOnMap;
  @bindable rating = 0;

  constructor(toastService, loader, translationService,
  remarkService, operationService, authService,
  userService, featureService, eventAggregator) {
    this.toast = toastService;
    this.loader = loader;
    this.translationService = translationService;
    this.remarkService = remarkService;
    this.operationService = operationService;
    this.authService = authService;
    this.userService = userService;
    this.featureService = featureService;
    this.eventAggregator = eventAggregator;
    this.visiblePhotoIndex = 0;
    this.account = {userId: ''};
  }

  async attached() {
    if (this.isAuthenticated) {
      this.account = await this.userService.getAccount();
    }
    this.remarkPhotoAddedSubscription = await this.subscribeRemarkPhotoAdded();
    this.remarkPhotoRemovedSubscription = await this.subscribeRemarkPhotoRemoved();
  }

  detached() {
    this.remarkPhotoAddedSubscription.dispose();
    this.remarkPhotoRemovedSubscription.dispose();
  }

  get isAuthenticated() {
    return this.authService.isLoggedIn;
  }

  get featuresEnabled() {
    return this.featureService.enabled;
  }

  get isRemarkReported() {
    return !!this.remark.createdAt;
  }

  get showFavorite() {
    return this.isRemarkReported;
  }

  get hasPhoto() {
    return this.remark && this.remark.photos && this.remark.photos.length > 0;
  }

  get isProcessingPhotos() {
    return this.remark && this.remark.status === 'processing_photos';
  }

  get hasMultiplePhotos() {
    return this.hasPhoto && this.remark.photos.length > 1;
  }

  get hasPreviousPhoto() {
    return this.hasPhoto && this.visiblePhotoIndex > 0;
  }

  get hasNextPhoto() {
    return this.hasPhoto && this.visiblePhotoIndex < this.remark.photos.length - 1;
  }

  get canDeletePhotos() {
    return this.isAuthenticated
      && this.remark.createdAt
      && this.account
      && (this.account.userId === this.remark.author.userId ||
        this.userService.canModerate(this.account));
  }

  markPhotoToDelete(photo) {
    this.photoToDelete = photo;
  }

  async deletePhoto() {
    if (!this.photoToDelete) {
      return;
    }

    let groupId =  this.photoToDelete.groupId;
    this.photoToDelete = null;
    this.loader.display();
    this.toast.info(this.translationService.tr('remark.deleting_photo'));
    await this.remarkService.deletePhoto(this.remark.id, groupId);
    let index = this.remark.photos.findIndex(x => x.groupId === groupId);
    if (index > -1) {
      this.remark.photos.splice(index, 1);
    }
    this.showLastPhoto();
  }

  showPreviousPhoto() {
    if (this.hasPreviousPhoto) {
      this.visiblePhotoIndex--;
      this.displayPhoto();
    }
  }

  showNextPhoto() {
    if (this.hasNextPhoto) {
      this.visiblePhotoIndex++;
      this.displayPhoto();
    }
  }

  showLastPhoto() {
    if (this.remark.photos) {
      this.visiblePhotoIndex = this.remark.photos.length - 1;
      this.displayPhoto();
    }
  }

  displayPhoto() {
    if (!this.remark.photos) {
      return;
    }
    this.remark.photos.forEach((photo, index) => {
      if (this.visiblePhotoIndex === index) {
        photo.visible = true;

        return;
      }
      photo.visible = false;
    });
  }

  async subscribeRemarkPhotoAdded() {
    return await this.eventAggregator
      .subscribe('remark:photo_added', async message => {
        if (message.remarkId !== this.remark.id) {
          return;
        }
        let smallPhoto = message.newPhotos.find(x => x.size === 'small');
        let mediumPhoto = message.newPhotos.find(x => x.size === 'medium');
        let bigPhoto = message.newPhotos.find(x => x.size === 'big');
        let photo = {
          groupId: smallPhoto.groupId,
          visible: true,
          small: smallPhoto.url,
          medium: mediumPhoto.url,
          big: bigPhoto.url
        };
        this.remark.status = null;
        this.remark.photos.push(photo);
        this.showLastPhoto();
      });
  }

  async subscribeRemarkPhotoRemoved() {
    return await this.eventAggregator
      .subscribe('remark:photo_removed', async message => {
        if (message.remarkId !== this.remark.id) {
          return;
        }
        if (!message.groupIds) {
          return;
        }
        message.groupIds.forEach(groupId => {
          let index = this.remark.photos.findIndex(x => x.groupId === groupId);
          if (index > -1) {
            this.remark.photos.splice(index, 1);
          }
        });
        this.showLastPhoto();
      });
  }

  get isFavorite() {
    return this.remark.userFavorites && this.remark.userFavorites.indexOf(this.account.userId) > -1;
  }

  async addFavorite() {
    if (this.remark.userFavorites === null) {
      this.remark.userFavorites = [];
    }
    this.remark.userFavorites.push(this.account.userId);
    await this.userService.addFavoriteRemark(this.remark.id);
    this.toast.info(this.translationService.tr('remark.favorite_remark_added'));
  }

  async deleteFavorite() {
    let index = this.remark.userFavorites.indexOf(this.account.userId);
    this.remark.userFavorites.splice(index, 1);
    await this.userService.deleteFavoriteRemark(this.remark.id);
    this.toast.info(this.translationService.tr('remark.favorite_remark_deleted'));
  }
}
