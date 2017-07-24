export default {
  debug: true,
  testing: false,
  title: 'Collectively [Stage]',
  apiUrl: 'https://api-stage.becollective.ly/',
  websocketUrl: 'https://websockets-stage.becollective.ly',
  websocketPath: '/socket.io',
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
