export default {
  debug: true,
  testing: true,
  title: 'Collectively [Docker]',
  apiUrl: 'http://api:5000/',
  websocketUrl: 'http://websockets-service:9050',
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
