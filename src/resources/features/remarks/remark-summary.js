import {inject, bindable} from 'aurelia-framework';
import ToastService from 'resources/services/toast-service';
import TranslationService from 'resources/services/translation-service';
import RemarkService from 'resources/services/remark-service';

@inject(ToastService, TranslationService, RemarkService)
export class RemarkSummary {
  @bindable remark = null;

  constructor(toastService, translationService, remarkService) {
    this.toast = toastService;
    this.translationService = translationService;
    this.remarkService = remarkService;
    this.visiblePhotoIndex = 0;
  }

  get isRemarkReported() {
    return !!this.remark.createdAt;
  }

  get hasPhoto() {
    return this.remark && this.remark.photos && this.remark.photos.length > 0;
  }

  get hasMultuplePhotos() {
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
      this.visiblePhotoIndex = this.photos.length - 1;
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
}
