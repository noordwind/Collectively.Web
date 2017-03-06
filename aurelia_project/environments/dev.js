export default {
  debug: false,
  testing: false,
  title: 'Coolector [Dev]',
  apiUrl: 'https://coolector-dev.tk/api/',
  websocketUrl: 'http://coolector-dev.tk/websockets',
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
    appId: '1827532517461712'
  },
  logLevel: 'trace'
};
