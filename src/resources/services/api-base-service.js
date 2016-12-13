import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import environment from '../../environment';
import CacheService from 'resources/services/cache-service';
import AuthService from 'resources/services/auth-service';
import ToastService from 'resources/services/toast-service';
import LanguageDetectionService from 'resources/services/language-detection-service';

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
                  'Accept': 'application/json',
                  'Accept-Language': LanguageDetectionService.detect()
                }
              });
    });

    this.baseCorsResponseHeaderNames = ['cache-control', 'content-type'];
    this.emptyBodyStatuses     = [201, 202];
    this.emptyResponseStatuses = [204, 401];
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

  async post(path, body) {
    return await this.send('post', path, body);
  }

  async put(path, body) {
    return await this.send('put', path, body);
  }

  async delete(path) {
    return await this.send('delete', path);
  }

  async send(method, path, body) {
    const response = await this.http.fetch(path, {
      method: method,
      headers: this.getHeaders(),
      body: body ? json(body) : null
    });

    return this.handleResponse(response);
  }

  buildPathWithQuery(path, params = {}) {
    let pathWithQuery = path;
    if (Object.keys(params).length > 0) {
      pathWithQuery = `${path}?${$.param(params)}`;
    }

    return pathWithQuery;
  }

  handleResponse(response) {
    if (this.emptyBodyStatuses.includes(response.status)) {
      return this.exposeHeaders(response);
    } else if (this.emptyResponseStatuses.includes(response.status)) {
      return new Promise((resolve) => resolve({}));
    }

    return response.json();
  }

  exposeHeaders(response) {
    const headers = {};
    for (let [name, value] of response.headers) {
      if (!this.baseCorsResponseHeaderNames.includes(name)) {
        headers[name] = value;
      }
    }

    return new Promise((resolve) => resolve(headers));
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

  getHeaders() {
    return {'Authorization': `Bearer ${this.authService.token}`};
  }
}
