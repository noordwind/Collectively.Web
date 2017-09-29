import {inject} from 'aurelia-framework';
import ScriptLoadingService from 'resources/services/script-loading-service';
import TranslationService from 'resources/services/translation-service';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import ApiBaseService from 'resources/services/api-base-service';
import OperationService from 'resources/services/operation-service';
import ToastService from 'resources/services/toast-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import environment from '../../environment';

@inject(ScriptLoadingService, TranslationService, AuthService, UserService, ApiBaseService,
 OperationService, ToastService, EventAggregator)
export default class FacebookService {
  constructor(scriptLoadingService, translationService, authService, userService,
  apiBaseService, operationService, toast, eventAggregator) {
    this.scriptLoadingService = scriptLoadingService;
    this.translationService = translationService;
    this.authService = authService;
    this.userService = userService;
    this.apiBaseService = apiBaseService;
    this.operationService = operationService;
    this.toast = toast;
    this.eventAggregator = eventAggregator;
    this._initialized = false;
  }

  init(next) {
    const facebookScriptUrl = '//connect.facebook.net/en_US/sdk.js';
    this.scriptLoadingService.load(facebookScriptUrl).then(() => {
      window.fbAsyncInit = () => {
        FB.init({
          appId: environment.facebook.appId,
          cookie: true,
          xfbml: false,
          version: 'v2.8'
        });
        this._initialized = true;
      };
    });

    return this;
  }

  get initialized() {
    return this._initialized;
  }
  

  login(next, err) {
    FB.login((response) => this.loginCallback(response, next, err), {scope: 'email, publish_actions'});

    return false;
  }

  async loginCallback(response, next, err) {
    if (response.status === 'connected') {
      let accessToken = response.authResponse.accessToken;
      let session = await this.userService.signIn({
        provider: 'facebook',
        accessToken: accessToken
      });
      if (session.token) {
        this.authService.session = {
          token: session.token,
          expires: session.expires,
          provider: 'facebook',
          externalAccessToken: accessToken
        };
        next();

        return;
      }
      this.toast.error(this.toast.error(this.translationService.trCode('error')));
    } else if (response.status === 'not_authorized') {
      this.toast.error(this.translationService.trCode('facebook_no_access'));
    } else {
      this.toast.error(this.translationService.trCode('facebook_not_signed_in'));
    }
    err();
  }
}
