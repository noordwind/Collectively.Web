import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import ToastService from 'resources/services/toast-service';
import TranslationService from 'resources/services/translation-service';
import RemarkService from 'resources/services/remark-service';
import OperationService from 'resources/services/operation-service';

@inject(ToastService, TranslationService,
 RemarkService, OperationService, EventAggregator)
export class RemarkSummary {
  @bindable remark = null;

  constructor(toastService, translationService,
  remarkService, operationService, eventAggregator) {
    this.toast = toastService;
    this.translationService = translationService;
    this.remarkService = remarkService;
    this.operationService = operationService;
    this.eventAggregator = eventAggregator;
    this.visiblePhotoIndex = 0;
  }

  async attached() {
    this.remarkPhotoAddedSubscription = await this.subscribeRemarkPhotoAdded();
    this.remarkPhotoRemovedSubscription = await this.subscribeRemarkPhotoRemoved();
  }

  detached() {
    this.remarkPhotoAddedSubscription.dispose();
    this.remarkPhotoRemovedSubscription.dispose();
  }

  get isRemarkReported() {
    return !!this.remark.createdAt;
  }

  get hasPhoto() {
    return this.remark && this.remark.photos && this.remark.photos.length > 0;
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

  markPhotoToDelete(photo) {
    this.photoToDelete = photo;
  }

  async deletePhoto() {
    if (this.photoToDelete === null) {
      return;
    }

    let groupId =  this.photoToDelete.groupId;
    this.photoToDelete = null;
    this.loader.display();
    this.toast.info(this.translationService.tr('remark.deleting_photo'));
    await this.remarkService.deletePhoto(this.remark.id, groupId);
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
        message.groupIds.forEach(groupId => {
          let index = this.remark.photos.findIndex(x => x.groupId === groupId);
          if (index > -1) {
            this.remark.photos.splice(index, 1);
          }
        });
        this.showLastPhoto();
      });
  }
}
