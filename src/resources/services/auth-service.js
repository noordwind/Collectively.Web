import {inject} from 'aurelia-framework';
import StorageService from 'resources/services/storage-service';
import environment from '../../environment';

@inject(StorageService)
export default class AuthService {
  constructor(storageService) {
    this.storageService = storageService;
    this.environment = environment;
  }

  get idToken() {
    let tokenObject = this.storageService.read(this.environment.idTokenStorageKey);
    if (tokenObject && new Date(tokenObject.expires) > new Date()) {
      return tokenObject.token;
    }

    return null;
  }

  set idToken(newToken) {
    let expireDate = new Date();
    expireDate.setSeconds(expireDate.getSeconds() + this.environment.auth0.jwtExpiration);
    let tokenObject = {
      'token': newToken,
      'expires': expireDate
    };
    this.storageService.write(this.environment.idTokenStorageKey, tokenObject);
  }

  removeIdToken() {
    this.storageService.delete(this.environment.idTokenStorageKey);
  }

  get accessToken() {
    return this.storageService.read(this.environment.accessTokenStorageKey);
  }

  set accessToken(newToken) {
    this.storageService.write(this.environment.accessTokenStorageKey, newToken);
  }

  removeAccessToken() {
    this.storageService.delete(this.environment.accessTokenStorageKey);
  }

  get isLoggedIn() {
    return !!this.idToken;
  }

  get profile() {
    return this.storageService.read(this.environment.profileStorageKey);
  }

  set profile(newProfile) {
    this.storageService.write(this.environment.profileStorageKey, newProfile);
  }

  removeProfile() {
    this.storageService.delete(this.environment.profileStorageKey);
  }

  authorizeRequest(request) {
    if (this.idToken && request.headers.append) {
            //console.log("Authorizing request " + request.url + " using token " + this.idToken);
            //request.headers.append("Authorization", `Bearer ${this.idToken}`);
            //console.log(request.headers);
    }

    return request;
  }

  getAuth0Lock() {
    return new Auth0Lock(this.environment.auth0.token, this.environment.auth0.domain);
  }

  authenticateViaAuth0(lock, next) {
    let self = this;
    lock.on('authenticated',
            (authResult) => {
              lock.getProfile(authResult.idToken,
                    (error, profile) => {
                      if (error) {
                            // Handle error
                        return;
                      }
                      self.storageService.deleteAll();
                      self.idToken = authResult.idToken;
                      self.accessToken = authResult.accessToken;
                      self.profile = JSON.stringify(profile);
                      next(authResult, profile);
                    });
            });
  }

  logout() {
    this.storageService.deleteAll();
  }
}
