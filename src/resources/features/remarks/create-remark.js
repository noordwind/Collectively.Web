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
      async operation => await this.handleRemarkCreated(operation),
      operation => this.handleCreateRemarkRejected(operation));
    this.location.startUpdatingAddress();
    this.fileInput = document.getElementById('new-image');
    $('#new-image').change(async () => {
      this.newImage = this.files[0];
    });
  }

  detached() {
    this.operationService.unsubscribeAll();
    this.location.stopUpdatingAddress();
  }

  async activate(params) {
    this.remark.category = params.category;
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

  get address() {
    return this.location.current.address || this.translationService.tr('common.location');
  }

  goToSummary() {
    this.remark.address = this.address;
    this.toggleSummary();
  }

  toggleSummary() {
    $('.fill-remark-screen').toggle();
    $('.remark-summary-screen').toggle();
  }

  async sendRemark() {
    this.sending = true;
    this.loader.display();
    this.remark.tags = this.tags.filter(x => x.selected).map(x => x.key);
    this.log.trace('create_remark_submitted', {remark: this.remark});
    await this.remarkService.sendRemark(this.remark);
  }

  displayCamera() {
    this.fileInput.click();
  }

  newImageResized = async (base64) => {
    if (base64 === '') {
      return;
    }
    this.base64Image = base64;
    this.remark.photos = [{
      medium: base64,
      visible: true
    }];
  };

  async addPhotos(remarkId, base64Image) {
    this.sending = true;
    this.loader.display();
    this.toast.info(this.translationService.tr('remark.adding_photo'));
    let reader = new FileReader();
    let file = this.newImage;
    reader.onload = async () => {
      if (file.type.indexOf('image') < 0) {
        this.toast.error(this.translationService.trCode('invalid_file'));
        this.loader.hide();
        this.sending = false;

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

      await this.remarkService.addPhotos(remarkId, photos);
      await this.toast.success(this.translationService.tr('remark.processing_photo'), 6000);
    };
    reader.readAsDataURL(file);
  }

  async handleRemarkCreated(operation) {
    this.toast.success(this.translationService.tr('remark.processed'));
    this.loader.hide();
    let remarkId = operation.resource.split('/')[1];
    if (this.remark.photos) {
      await this.addPhotos(remarkId, this.base64Image);
    }
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
