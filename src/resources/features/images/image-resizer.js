import {inject, bindable} from 'aurelia-framework';
import ToastService from 'resources/services/toast-service';

@inject(ToastService)
export class ImageResizer {
    @bindable width = 1600;
    @bindable height = 1200;
    @bindable image;
    @bindable resized;

  constructor(toastService) {
    this.toast = toastService;
  }

  async imageChanged(value) {
    if (typeof value === 'undefined') {
      return;
    }
    await this.resizeImage(value);
  }

  async resizeImage(image) {
    let self = this;
    if (image.type.indexOf('image') < 0) {
      await self.toast.error('Selected photo is invalid.');

      return;
    }
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let imageToResize = new Image();
    imageToResize.src = URL.createObjectURL(image);
    imageToResize.onload = function() {
      canvas.height = canvas.width * (imageToResize.height / imageToResize.width);

      let canvasElement = document.createElement('canvas');
      let resizedContext = canvasElement.getContext('2d');

      canvasElement.width = imageToResize.width * 0.5;
      canvasElement.height = imageToResize.height * 0.5;
      resizedContext.drawImage(imageToResize, 0, 0, canvasElement.width, canvasElement.height);

      resizedContext.drawImage(canvasElement, 0, 0, canvasElement.width * 0.5, canvasElement.height * 0.5);
      context.drawImage(canvasElement, 0, 0, canvasElement.width * 0.5, canvasElement.height * 0.5,
        0, 0, canvas.width, canvas.height);

      let base64 = canvas.toDataURL('image/jpeg');
      self.resized(base64);
    };
  }
}
