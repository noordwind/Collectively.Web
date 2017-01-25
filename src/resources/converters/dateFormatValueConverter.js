import * as moment from 'moment';

export class DateFormatValueConverter {
   toView(value) {
      return moment.default(value).format('DD/MM/YYYY HH:mm');
   }
}
