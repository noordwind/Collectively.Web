import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import TranslationService from 'resources/services/translation-service';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';

@inject(Router, I18N, TranslationService, LocationService,
RemarkService, ToastService, LoaderService)
export class CreateRemark {
  constructor(router, i18n, translationService, location, remarkService, toast, loader) {
    this.router = router;
    this.i18n = i18n;
    this.translationService = translationService;
    this.location = location;
    this.remarkService = remarkService;
    this.toast = toast;
    this.loader = loader;
    this.remark = {
      tags: []
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
    let tags = await this.remarkService.getTags();
    this.tags = tags.map(tag => {
      return {
        key: tag,
        value: this.translationService.tr(`tags.${tag}`),
        selected: false
      };
    });
  }

  setCategory(category) {
    this.category = category;
    this.remark.category = category.name;
  }

  async sendRemark() {
    this.isSending = true;
    this.loader.display();
    this.tags.forEach(tag => {
      if (tag.selected) {
        this.remark.tags.push(tag.key);
      }
    });
    this.toast.info(this.translationService.tr('remark.processing'));
    let remarkCreated = await this.remarkService.sendRemark(this.remark);
    if (remarkCreated.success) {
      this.toast.success(this.translationService.tr('remark.processed'));
      this.loader.hide();
      let remarkId = remarkCreated.resource.split('/')[1];
      this.router.navigateToRoute('remark', {id: remarkId});

      return;
    }

    this.toast.error(this.translationService.trCode(remarkCreated.code));
    this.isSending = false;
    this.loader.hide();
  }

  toggleTag(tag) {
    tag.selected = !tag.selected;
  }
}
