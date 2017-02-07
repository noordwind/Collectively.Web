export default {
  debug: true,
  testing: true,
  title: 'Coolector [Local]',
  apiUrl: 'http://localhost:5000/',
  signalRUrl: 'http://localhost:15000/hub',
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
