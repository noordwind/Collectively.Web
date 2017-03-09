export default {
  debug: true,
  testing: false,
  title: 'Collectively [Stage]',
  apiUrl: 'https://api-stage.becollective.ly/',
  websocketUrl: 'https://api-stage.becollective.ly/websockets',
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
