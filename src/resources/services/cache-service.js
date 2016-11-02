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

  readFirst(regexp) {
    return this.storageService.readFirst(regexp);
  }

  getFirstKey(regexp) {
    return this.storageService.getFirstKey(regexp);
  }

  invalidate(keySuffix) {
    this.storageService.delete(this.key(keySuffix));
  }

  invalidateAll() {
    this.invalidateMatchingKeys(/^cache.*/);
  }

  invalidateMatchingKeys(keySuffix) {
    this.storageService.deleteMatchingKeys(keySuffix);
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
