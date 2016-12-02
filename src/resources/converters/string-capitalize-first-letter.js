import {LogManager} from 'aurelia-framework';
const logger = LogManager.getLogger('StringCapitalizeFirstLetterValueConverter');

export class StringCapitalizeFirstLetterValueConverter {
  toView(value) {
    if (typeof value !== 'string') {
      logger.error(`Unrecognized value: ${value}`);
      return;
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
