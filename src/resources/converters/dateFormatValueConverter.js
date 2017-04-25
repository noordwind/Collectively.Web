import * as moment from 'moment';

export class DateFormatValueConverter {
  toView(value, format) {
    format = format || 'DD-MM-YYYY HH:mm';
    return moment.default(value).format(format);
  }
}
