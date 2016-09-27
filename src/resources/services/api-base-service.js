import {inject} from 'aurelia-framework';
import fetch from 'whatwg-fetch';
import {HttpClient, json} from 'aurelia-fetch-client';
import environment from '../../environment';
import AuthService from 'resources/services/auth-service';
import ToastService from 'resources/services/toast-service';

@inject(HttpClient, AuthService, ToastService)
export default class ApiBaseService {
    constructor(http, authService, toast) {
        this.authService = authService;
        this.http = http;
        this.toast = toast;
        this.http.configure(config => {
            config
              .withBaseUrl(environment.apiUrl)
              .withDefaults({
                  headers: {
                      'content-type':     'application/json',
                      'Accept':           'application/json',
                      'X-Requested-With': 'Fetch'
                  }
              });
        this.baseCorsResponseHeaderNames = ['cache-control', 'content-type'];
      });
    }

    async get(path) {
        const response = await this.http.fetch(path, {headers: this.getHeaders()});

        return response.json();
    }

    async post(path, params) {
        let self = this;
        const response = await this.http.fetch(path, {
            method: 'post',
            body:   json(params),
            headers: this.getHeaders()
        });
        if(response.status >= 400) {
            self.toast.error("There was an error while executing the request.");
        }
        if(response.status === 200) {
          return response;
        }
        if (response.status !== 201) {
            return response.json();
        } else {
            const headers = {};
            for (let [name, value] of response.headers) {
              if (!this.baseCorsResponseHeaderNames.includes(name)) {
                headers[name] = value;
            }
    }
    return new Promise((resolve, reject) => {
        if (Object.keys(headers).length > 0) {
            resolve(headers);
        } else {
            reject(Error("Response 201 didn't contain any resource-related headers."));
        }
    });
    }
  }

  getHeaders(){
    return {"Authorization": `Bearer ${this.authService.idToken}`};
  }
}
