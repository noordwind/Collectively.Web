export default {
  debug: true,
  testing: false,
  title: 'Collectively [Stage]',
  apiUrl: 'https://api-stage.becollective.ly/',
  identityApiUrl: 'https://identity-stage.becollective.ly/',
  websocketUrl: 'https://websockets-stage.becollective.ly',
  signalRUrl: 'https://ws-stage.becollective.ly/collectively',
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
