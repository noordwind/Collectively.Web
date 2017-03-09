export default {
  debug: false,
  testing: false,
  title: 'Collectively [Dev]',
  apiUrl: 'https://api-dev.becollective.ly/',
  websocketUrl: 'https://api-dev.becollective.ly/websockets',
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
