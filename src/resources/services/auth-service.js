import {inject} from 'aurelia-framework';
import AppConfig from 'resources/app-config';

@inject(AppConfig)
export default class AuthService {
    constructor(appConfig) {
        this.appConfig = appConfig;
    }

    get idToken() {
        return localStorage.getItem(this.appConfig.idTokenStorageKey);
    }

    set idToken(newToken) {
        localStorage.setItem(this.appConfig.idTokenStorageKey, newToken);
    }

    removeIdToken() {
        localStorage.removeItem(this.appConfig.idTokenStorageKey);
    }

    get accessToken() {
        return localStorage.getItem(this.appConfig.accessTokenStorageKey);
    }

    set accessToken(newToken) {
        localStorage.setItem(this.appConfig.accessTokenStorageKey, newToken);
    }

    removeAccessToken() {
        localStorage.removeItem(this.appConfig.accessTokenStorageKey);
    }

    get isLoggedIn() {
        return !!this.idToken;
    }

    get profile() {
        return localStorage.getItem(this.appConfig.profileStorageKey);
    }

    set profile(newProfile) {
        localStorage.setItem(this.appConfig.profileStorageKey, newProfile);
    }

    removeProfile() {
        localStorage.removeItem(this.appConfig.profileStorageKey);
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
        return new Auth0Lock(this.appConfig.auth0.token, this.appConfig.auth0.domain);
    }

    authenticateViaAuth0(lock, next) {
        var self = this;
        lock.on("authenticated",
            (authResult) => {
                lock.getProfile(authResult.idToken,
                    (error, profile) => {
                        if (error) {
                            // Handle error
                            return;
                        }

                        self.idToken = authResult.idToken;
                        self.accessToken = authResult.accessToken;
                        self.profile = JSON.stringify(profile);
                        next(authResult,profile);
                    });
            });
    }

    logout () {
        this.removeIdToken();
        this.removeAccessToken();
        this.removeProfile();
    }
}
