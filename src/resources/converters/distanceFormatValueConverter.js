export class DistanceFormatValueConverter {
  toView(input, decimalNumbers) {
    let decimals = decimalNumbers || 0;
    let value = parseFloat(Math.round(input * 100) / 100).toFixed(0);
    if (value >= 1000) {
      return `${(value / 1000).toFixed(decimals)} km`;
    } else {
      return `${value} m`;
    }
  }
}
