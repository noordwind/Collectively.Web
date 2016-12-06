import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import TranslationService from 'resources/services/translation-service';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import FileStore from 'resources/services/file-store';

@inject(Router, I18N, TranslationService, LocationService,
RemarkService, ToastService, LoaderService, FileStore)
export class CreateRemark {
  constructor(router, i18n, translationService, location, remarkService, toast, loader, fileStore) {
    this.router = router;
    this.i18n = i18n;
    this.translationService = translationService;
    this.location = location;
    this.remarkService = remarkService;
    this.toast = toast;
    this.loader = loader;
    this.fileStore = fileStore;
    if (fileStore.current === null) {
      router.navigate('');

      return;
    }
    this.remark = {
      photo: fileStore.current
    };
    this.isSending = false;
  }

  async activate() {
    this.categories = await this.remarkService.getCategories();
    this.categories.forEach(category => {
      category.translatedName = this.translationService.tr(`remark.category_${category.name}`);
    });
    this.setCategory(this.categories[0]);
    this.remark.latitude = this.location.current.latitude;
    this.remark.longitude = this.location.current.longitude;
    this.remark.address = this.location.current.address;
  }

  setCategory(category) {
    this.category = category;
    this.remark.category = category.name;
  }

  async sendRemark() {
    this.isSending = true;
    this.loader.display();
    this.toast.info(this.translationService.tr('remark.processing'));
    let remarkCreated = await this.remarkService.sendRemark(this.remark);
    if (remarkCreated.success) {
      this.toast.success(this.translationService.tr('remark.processed'));
      this.loader.hide();
      this.router.navigateToRoute('remarks');

      return;
    }

    this.toast.error(this.translationService.trCode(remarkCreated.code));
    this.isSending = false;
    this.loader.hide();
  }
}
