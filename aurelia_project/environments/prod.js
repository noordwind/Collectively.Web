export default {
  debug: false,
  testing: false,
  title: 'Collectively',
  apiUrl: 'https://api.becollective.ly/',
  websocketUrl: 'https://websockets.becollective.ly',
  signalRUrl: 'https://ws.becollective.ly/collectively',
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
    appId: '1827531987461765'
  },
  logLevel: 'info'
};
