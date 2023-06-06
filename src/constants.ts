export default {
  version: "0.3.1",
  serverVersion: "0.3.0",

  // Media
  minWidth: 1450,
  
  // Watch intervals
  watchServerConnInterval: 4000,

  // Fetch intervals
  fetchUsersAfter: 60000,
  fetchBoughtItemsAfter: 5000,

  // API definition
  apiAccessToken: "/api/web/v1/login/access-token",
  apiGetHostTime: "/api/web/v1/host/time",
  apiGetHostVersion: "/api/web/v1/host/version",
};