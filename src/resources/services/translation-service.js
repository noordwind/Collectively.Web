import {inject} from 'aurelia-dependency-injection';
import {I18N} from 'aurelia-i18n';
import {StringCapitalizeFirstLetterValueConverter} from 'resources/converters/string-capitalize-first-letter';

@inject(I18N, StringCapitalizeFirstLetterValueConverter)
export default class TranslationService {
  constructor(i18n, stringCapitalizeFirstLetterVC) {
    this.i18n = i18n;
    this.stringCapitalizeFirstLetterVC = stringCapitalizeFirstLetterVC;
  }

  tr(translationKey) {
    return this.i18n.tr(translationKey);
  }

  trCapitalized(translationKey) {
    return this.stringCapitalizeFirstLetterVC.toView(this.i18n.tr(translationKey));
  }

  trCode(code) {
    return this.i18n.tr(`code.${code}`);
  }

  trCodeCapitalized(code) {
    return this.stringCapitalizeFirstLetterVC.toView(this.i18n.trCode(code));
  }
}
