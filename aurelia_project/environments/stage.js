export default {
  debug: true,
  testing: false,
  title: 'Coolector [Stage]',
  apiUrl: 'https://coolector-stage.tk/api/hub',
  signalRUrl: '',
  sessionStorageKey: 'session',
  filtersStorageKey: 'filters',
  locationStorageKey: 'location',
  defaultLanguage: 'en',
  constraints: {
    remarkPhotosLimit: 5
  },
  feature: {
    resolveRemarkPhotoRequired: false,
    resolveRemarkLocationRequired: false
  },
  facebook: {
    appId: ''
  }
};
