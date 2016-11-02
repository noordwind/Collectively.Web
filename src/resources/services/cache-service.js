import {inject} from 'aurelia-framework';
import StorageService from 'resources/services/storage-service';

@inject(StorageService)
export default class CacheService {
  constructor(storageService) {
    this.storageService = storageService;
  }

  write(keySuffix, value) {
    this.storageService.write(this.key(keySuffix), value);
  }

  read(keySuffix) {
    return this.storageService.read(this.key(keySuffix));
  }

  invalidate(keySuffix) {
    this.storageService.delete(this.key(keySuffix));
  }

  invalidateAll() {
    this.storageService.deleteMatchingKeys(/^cache.*/);
  }

  async fetch(key, next) {
    const cachedObject = this.read(key);
    if (cachedObject) {
      return cachedObject;
    }
    const newObjectOrPromise = await next();
    if (newObjectOrPromise.then) {
      newObjectOrPromise.then((newObject) => {
        this.write(key, newObject);
        return newObject;
      });
    } else {
      const newObject = newObjectOrPromise;
      this.write(key, newObject);
      return newObject;
    }
  }

  key(suffix) {
    return `cache/${suffix}`;
  }
}
