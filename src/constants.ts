export default {
  version: "0.7.0",
  serverVersion: "0.7.0",

  // Media
  minWidth: 400,
  minWidthTablet: 760,
  minWidthDesktop: 1280,

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
  apiAccessToken: "/api/web/v1/login/access-token",
  apiGetHostTime: "/api/web/v1/host/time",
  apiGetHostVersion: "/api/web/v1/host/version",
};
