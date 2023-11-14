export default {
  version: "0.3.4",
  serverVersion: "0.3.2",

  // Media
  minWidth: 400,
  minWidthTablet: 760,
  minWidthDesktop: 1280,

  // Watch intervals
  watchServerConnInterval: 4000,

  // Fetch intervals
  patchUserStoreInterval: 5000,
  patchUsersStoreInterval: 10000,
  patchBoughtItemsStoreInterval: 10000,
  patchServerConfigInterval: 60000,

  fetchUsersAfter: 60000,
  fetchBoughtItemsAfter: 5000,

  // API definition
  apiAccessToken: "/api/web/v1/login/access-token",
  apiGetHostTime: "/api/web/v1/host/time",
  apiGetHostVersion: "/api/web/v1/host/version",
};
