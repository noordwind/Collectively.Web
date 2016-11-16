import {inject} from 'aurelia-framework';
import LoaderService from 'resources/services/loader-service';

@inject(LoaderService)
export default class LoaderHandler {
  constructor(loader) {
    this.loader = loader;
  }

  run(navigationInstruction, next) {
    this.loader.hide();
    return next();
  }
}
