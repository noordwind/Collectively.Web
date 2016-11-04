import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LocationService from 'resources/services/location-service';
import RemarkService from 'resources/services/remark-service';
import ToastService from 'resources/services/toast-service';
import LoaderService from 'resources/services/loader-service';
import FileStore from 'resources/services/file-store';

@inject(Router, LocationService, RemarkService, ToastService, LoaderService, FileStore)
export class CreateRemark {
  constructor(router, location, remarkService, toast, loader, fileStore) {
    this.router = router;
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
    this.setCategory(this.categories[0]);
    this.remark.latitude = this.location.current.latitude;
    this.remark.longitude = this.location.current.longitude;
  }

  setCategory(category) {
    this.category = category;
    this.remark.category = category.name;
  }

  async sendRemark() {
    this.isSending = true;
    this.loader.display();
    this.toast.info('Sending your remark...');
    this.remarkService.sendRemark(this.remark, 8000)
    .then(async response => {
      await this.toast.success('Your remark has been sent.');
      this.loader.hide();
      this.router.navigate('');
    }, err => {
      this.toast.error('There was an error, please try again.');
      this.isSending = false;
      this.loader.hide();
    });
  }
}
