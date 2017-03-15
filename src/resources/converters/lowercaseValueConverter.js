export class LowercaseValueConverter {
  toView(value) {
    if (typeof value === 'string') {
      return value.toLowerCase();
    }
    return value;
  }
}
