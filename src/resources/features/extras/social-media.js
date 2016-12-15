import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import AuthService from 'resources/services/auth-service';
import TranslationService from 'resources/services/translation-service';

@inject(Router, AuthService, TranslationService)
export class SocialMedia {
  @bindable model;

  constructor(router, authService, translationService) {
    this.router = router;
    this.authService = authService;
    this.translationService = translationService;
    this.displaySocialMedia = false;
    this.services = [{name: 'Facebook', publish: false }];
  }

  async attached() {
    this.displaySocialMedia = this.authService.session.provider === 'facebook';
  }

  selectServices() {
    this.services.forEach(service => {
      if (!service.publish) {
        return;
      }

      switch (service.name.toLowerCase()) {
      case 'facebook':
        this.publishOnFacebook();
        break;

      default: break;
      }
    });
  }

  modelChanged(newValue) {
    newValue.socialMedia = [];
    this.boundModel = newValue;
  }

  publishOnFacebook() {
    this.boundModel.socialMedia.push({
      name: 'facebook',
      accessToken: this.authService.session.externalAccessToken,
      publish: true
    });
  }
}
