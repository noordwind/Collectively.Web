import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import TranslationService from 'resources/services/translation-service';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import OperationService from 'resources/services/operation-service';
import LogService from 'resources/services/log-service';

@inject(Router, I18N, TranslationService, LocationService,
RemarkService, ToastService, LoaderService, OperationService,
LogService)
export class CreateRemark {
  constructor(router, i18n, translationService, location, remarkService, toast,
    loader, operationService, logService) {
    this.router = router;
    this.i18n = i18n;
    this.translationService = translationService;
    this.location = location;
    this.remarkService = remarkService;
    this.toast = toast;
    this.loader = loader;
    this.operationService = operationService;
    this.log = logService;
    this.remark = {
      tags: []
    };
    this.sending = false;
  }

  attached() {
    this.log.trace('create_remark_attached');
    this.operationService.subscribe('create_remark',
      operation => this.handleRemarkCreated(operation),
      operation => this.handleCreateRemarkRejected(operation));
  }

  detached() {
    this.operationService.unsubscribeAll();
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
        key: tag.name,
        value: this.translationService.tr(`tags.${tag.name}`),
        selected: false
      };
    });
  }

  setCategory(category) {
    this.category = category;
    this.remark.category = category.name;
  }

  async sendRemark() {
    this.sending = true;
    this.loader.display();
    this.remark.tags = this.tags.filter(x => x.selected).map(x => x.key);
    this.log.trace('create_remark_submitted', {remark: this.remark});
    await this.remarkService.sendRemark(this.remark);
  }

  handleRemarkCreated(operation) {
    this.toast.success(this.translationService.tr('remark.processed'));
    this.loader.hide();
    let remarkId = operation.resource.split('/')[1];
    this.router.navigateToRoute('remark-added', { id: remarkId });
  }

  handleCreateRemarkRejected(operation) {
    this.toast.error(this.translationService.trCode(operation.code));
    this.sending = false;
    this.loader.hide();
  }

  toggleTag(tag) {
    tag.selected = !tag.selected;
  }
}
