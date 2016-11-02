export class TruncateValueConverter {
  toView(value) {
    return value && value.length > 15 ?  `${value.substring(0, 15)}...` : value;
  }
}
