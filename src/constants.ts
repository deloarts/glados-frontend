export default {
  version: "0.1.5",
  serverVersion: "0.2.1",

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