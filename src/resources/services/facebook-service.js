import {inject} from 'aurelia-framework';
import ScriptLoadingService from 'resources/services/script-loading-service';
import AuthService from 'resources/services/auth-service';
import UserService from 'resources/services/user-service';
import ApiBaseService from 'resources/services/api-base-service';
import OperationService from 'resources/services/operation-service';
import ToastService from 'resources/services/toast-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import environment from '../../environment';

@inject(ScriptLoadingService, AuthService, UserService, ApiBaseService,
 OperationService, ToastService, EventAggregator)
export default class FacebookService {
  constructor(scriptLoadingService, authService, userService,
  apiBaseService, operationService, toast, eventAggregator) {
    this.scriptLoadingService = scriptLoadingService;
    this.authService = authService;
    this.userService = userService;
    this.apiBaseService = apiBaseService;
    this.operationService = operationService;
    this.toast = toast;
    this.eventAggregator = eventAggregator;
  }

  init() {
    const facebookScriptUrl = '//connect.facebook.net/en_US/sdk.js';
    this.scriptLoadingService.load(facebookScriptUrl).then(() => {
      window.fbAsyncInit = () => {
        FB.init({
          appId: environment.facebook.appId,
          cookie: true,
          xfbml: false,
          version: 'v2.8'
        });
      };
    });

    return this;
  }

  login(next) {
    FB.login((response) => this.loginCallback(response, next), {scope: 'email, publish_actions'});

    return false;
  }

  async loginCallback(response, next, err) {
    if (response.status === 'connected') {
      let accessToken = response.authResponse.accessToken;
      let session = await this.userService.signIn({
        provider: 'facebook',
        accessToken: accessToken
      });
      if (session.sessionId && session.token && session.key) {
        this.authService.session = {
          sessionId: session.sessionId,
          token: session.token,
          expiry: session.expiry,
          key: session.key,
          provider: 'facebook',
          externalAccessToken: accessToken
        };
        next();

        return;
      }
      this.toast.error('There was an error, please try again.');
    } else if (response.status === 'not_authorized') {
      this.toast.error('Please allow Coolector app to access your Facebook account.');
    } else {
      this.toast.error('Please sign in to Facebook.');
    }
    err();
  }

  async postOnWall(message) {
    let request = {
      accessToken: this.authService.session.externalAccessToken,
      message: message };

    return await this.operationService.execute(async ()
      => await this.apiBaseService.post('social/facebook/wall', request));
  }
}
