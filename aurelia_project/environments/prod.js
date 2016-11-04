export default {
  debug: false,
  testing: false,
  title: 'Coolector',
  apiUrl: 'https://coolector.tk/api/',
  idTokenStorageKey: 'idToken',
  accessTokenStorageKey: 'accessToken',
  profileStorageKey: 'profile',
  filtersStorageKey: 'filters',
  locationStorageKey: 'location',
  auth0: {
    token: 'eYnnpDd1k61vxXQCbFwWtX45yX3PxFDA',
    domain: 'noordwind-dev.eu.auth0.com',
    jwtExpiration: 36000
  },
  feature: {
    resolveRemarkPhotoRequired: false,
    resolveRemarkLocationRequired: false
  }
};
