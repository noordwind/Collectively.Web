export class TruncateValueConverter {
  toView(value, limit) {
    limit = limit || 15;
    return value && value.length > limit ?  `${value.substring(0, limit)}...` : value;
  }
}
