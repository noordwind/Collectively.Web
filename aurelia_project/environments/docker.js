export default {
  debug: true,
  testing: true,
  title: 'Collectively [Docker]',
  apiUrl: 'http://api:5000/',
  identityApiUrl: 'https://users-service:10002/',
  websocketUrl: 'http://websockets-service:9050',
  signalRUrl: 'http://signalr-service:10010/collectively',
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
    appId: '1827532267461737'
  },
  logLevel: 'info'
};
