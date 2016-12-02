import LanguageDetector from 'i18next-browser-languagedetector';
import environment from '../../environment';

let LanguageDetectionService = new LanguageDetector(null, {
  order: ['querystring', 'navigator']
});
LanguageDetectionService._detect = LanguageDetectionService.detect;
LanguageDetectionService.detect = function() {
  let longLanguageCode = this._detect();
  if (typeof longLanguageCode === 'string') {
    return longLanguageCode.slice(0, 2);
  }

  return environment.defaultLanguage;
};
export default LanguageDetectionService;
