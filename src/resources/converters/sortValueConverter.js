import * as moment from 'moment';

export class SortValueConverter {
  toView(array, config) {
    let factor = (config.direction || 'ascending') === 'ascending' ? 1 : -1;
    return array
      .slice(0)
      .sort((a, b) => {
        if (Number.isFinite(a[config.propertyName])) {
          return (Number(a[config.propertyName]) - Number(b[config.propertyName])) * factor;
        }
        if (moment.default(a[config.propertyName]).isValid()) {
          return (new Date(a[config.propertyName]) - new Date(b[config.propertyName])) * factor;
        }
        return (Number(a[config.propertyName]) - Number(b[config.propertyName])) * factor;
      });
  }
}
