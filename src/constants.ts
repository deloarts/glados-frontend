export default {
  version: '0.12.3',
  serverVersion: '0.12.2',

  // Media
  minWidth: 400,
  minWidthTablet: 900,
  minWidthDesktop: 1300,

  // Watch intervals
  watchServerConnInterval: 4000,

  // Fetch intervals
  patchUserStoreInterval: 5000,
  patchUsersStoreInterval: 10000,
  patchProjectsStoreInterval: 10000,
  patchBoughtItemsStoreInterval: 10000,
  patchServerConfigInterval: 60000,

  fetchDashboardDataAfter: 5000,

  // API definition
  apiAccessToken: '/api/web/v1/login/access-token',
  apiGetHostTime: '/api/web/v1/host/time',
  apiGetHostVersion: '/api/web/v1/host/version',
}
