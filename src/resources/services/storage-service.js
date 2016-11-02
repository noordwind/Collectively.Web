export default class StorageService {
  write(key, value) {
    const setItem = (k, v) => {
      localStorage.setItem(key, JSON.stringify(value));
    };
    try {
      setItem(key, value);
    } catch (err) {
      if (err instanceof DOMException) {
        // localStorage.clear();
        // setItem(key, value);
      } else {
        throw err;
      }
    }
  }

  read(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  delete(key) {
    localStorage.removeItem(key);
  }

  deleteMatchingKeys(regexp) {
    this.iterateThroughKeys((key) => {
      const match = key.match(regexp);
      if (match) this.delete(match[0]);
    });
  }

  deleteAll() {
    this.deleteMatchingKeys(/.*/);
  }

  iterateThroughKeys(fn) {
    for (let key in localStorage) {
      fn(key);
    }
  }
}
