import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import environment from '../../environment';
import CacheService from 'resources/services/cache-service';
import AuthService from 'resources/services/auth-service';
import ToastService from 'resources/services/toast-service';

@inject(HttpClient, CacheService, AuthService, ToastService)
export default class ApiBaseService {
  constructor(http, cacheService, authService, toast) {
    this.http = http;
    this.cacheService = cacheService;
    this.authService = authService;
    this.toast = toast;
    this.http.configure(config => {
      config.withBaseUrl(environment.apiUrl)
              .withDefaults({
                headers: {
                  'Accept': 'application/json'
                  // 'X-Requested-With': 'Fetch'
                }
              });
      this.baseCorsResponseHeaderNames = ['cache-control', 'content-type'];
    });
  }

  async get(path, params = {}, cache = true, cacheKey = null) {
    let pathWithQuery = this.buildPathWithQuery(path, params);
    if (!cache) {
      this.cacheInvalidate(pathWithQuery);
    }
    cacheKey = cacheKey !== null ? cacheKey : pathWithQuery;
    return await this.cacheFetch(cacheKey, async () => {
      let httpResponse = await this.http.fetch(pathWithQuery, {headers: this.getHeaders()});

      return httpResponse.json();
    });
  }

  buildPathWithQuery(path, params = {}) {
    let pathWithQuery = path;
    if (Object.keys(params).length > 0) {
      pathWithQuery = `${path}?${$.param(params)}`;
    }

    return pathWithQuery;
  }

  async post(path, params) {
    let self = this;
    let headers = this.getHeaders();
    headers['Content-Type'] = 'application/json';
    const response = await this.http.fetch(path, {
      method: 'post',
      body: json(params),
      headers: headers
    });
    if (response.status >= 400) {
      self.toast.error('There was an error while executing the request.');
    }
    if (response.status === 200) {
      return response;
    }
    if (response.status === 202) {
      return response;
    }
    if (response.status !== 201) {
      return response.json();
    }
    headers = {};
    for (let [name, value] of response.headers) {
      if (!this.baseCorsResponseHeaderNames.includes(name)) {
        headers[name] = value;
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

  async put(path, params) {
    let self = this;
    let headers = this.getHeaders();
    headers['Content-Type'] = 'application/json';
    const response = await this.http.fetch(path, {
      method: 'put',
      body: json(params),
      headers: headers
    });

    if (response.status >= 400) {
      self.toast.error('There was an error while executing the request.');
    }
    if (response.status === 200) {
      return response;
    }
    if (response.status === 202) {
      return response;
    }
    if (response.status !== 201) {
      return response.json();
    }
    headers = {};
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

  async delete(path, params) {
    let self = this;
    let headers = this.getHeaders();
    let response = await this.http.fetch(path, {
      method: 'delete',
      headers: headers
    });

    if (response.status >= 400) {
      self.toast.error('There was an error while executing the request.');
    }
    if (response.status === 200) {
      return response;
    }
    if (response.status === 202) {
      return response;
    }
    if (response.status !== 201) {
      return response.json();
    }
    headers = {};
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

  getHeaders() {
    return {'Authorization': `Bearer ${this.authService.idToken}`};
  }

  cacheKey(keySuffix) {
    return `api/${keySuffix}`;
  }

  cacheFetch(keySuffix, next) {
    return this.cacheService.fetch(this.cacheKey(keySuffix), next);
  }

  cacheInvalidate(keySuffix) {
    this.cacheService.invalidate(this.cacheKey(keySuffix));
  }
}
