import XHR from 'i18next-xhr-backend';
import LanguageDetectionService from 'resources/services/language-detection-service';
import environment from './environment';

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-materialize-bridge', bridge => {
      bridge.useAutoComplete()
            .useButton()
            .useCarousel()
            .useCheckbox()
            .useChip()
            .useDropdown()
            .useFile()
            .useInput()
            .useModal()
            .useProgress()
            .useRadio()
            .useRange()
            .useSelect()
            .useSlider()
            .useSwitch();
    })
    .plugin('aurelia-validation')
    .plugin('aurelia-i18n', (instance) => {
      instance.i18next.use(XHR);
      instance.i18next.use(LanguageDetectionService);
      instance.setup({
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json'
        },
        attributes: ['t', 'i18n'],
        fallbackLng: environment.defaultLanguage,
        debug: environment.debug
      });
    });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
