export class DistanceFormatValueConverter {
   toView(input) {
       let value = parseFloat(Math.round(input * 100) / 100).toFixed(0);
       if (value >= 1000) {
           return `${(value/1000).toFixed(2)} km`;
       } else {
           return `${value} m`;
       }
   }
}