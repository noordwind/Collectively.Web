export default class FileStore {
  constructor() {
    this.currentFile = null;
  }

  set current(file) {
    this.currentFile = file;
  }

  get current() {
    return this.currentFile;
  }

  clear() {
    this.current = null;
  }
}
