export default {
  debug: false,

  // Media
  minWidth: 1450,

  // Server definition
  server: "http://0.0.0.0:5000",
  serverVersion: "0.1.0",

  // Watch intervals
  watchServerConnInterval: 10000,

  // Fetch intervals
  fetchUsersAfter: 60000,
  fetchBoughtItemsAfter: 60000,

  // API definition
  apiAccessToken: "/api/web/v1/login/access-token",
  apiGetHostTime: "/api/web/v1/host/time",
  apiGetHostVersion: "/api/web/v1/host/version",
};
