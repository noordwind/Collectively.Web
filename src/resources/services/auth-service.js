import {inject} from 'aurelia-framework';
import environment from '../../environment';

export default class AuthService {
    constructor() {
        this.environment = environment;
    }

    get idToken() {
        let tokenObject = JSON.parse(localStorage.getItem(this.environment.idTokenStorageKey));
        if(tokenObject && new Date(tokenObject.expires) > new Date())
            return tokenObject.token;

        return null;
    }

    set idToken(newToken) {
        let expireDate = new Date();
        expireDate.setSeconds(expireDate.getSeconds() + this.environment.auth0.jwtExpiration);
        let tokenObject = {
            "token":newToken, 
            "expires":expireDate
        };
        localStorage.setItem(this.environment.idTokenStorageKey, JSON.stringify(tokenObject));
    }

    removeIdToken() {
        localStorage.removeItem(this.environment.idTokenStorageKey);
    }

    get accessToken() {
        return localStorage.getItem(this.environment.accessTokenStorageKey);
    }

    set accessToken(newToken) {
        localStorage.setItem(this.environment.accessTokenStorageKey, newToken);
    }

    removeAccessToken() {
        localStorage.removeItem(this.environment.accessTokenStorageKey);
    }

    get isLoggedIn() {
        return !!this.idToken;
    }

    get profile() {
        return localStorage.getItem(this.environment.profileStorageKey);
    }

    set profile(newProfile) {
        localStorage.setItem(this.environment.profileStorageKey, newProfile);
    }

    removeProfile() {
        localStorage.removeItem(this.environment.profileStorageKey);
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
