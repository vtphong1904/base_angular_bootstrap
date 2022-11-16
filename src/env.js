(function (window) {
  window.__env = window.__env || {};

  // API url
  window.__env.apiUrl = 'http://localhost:8081/api';
  window.__env.apiUrlFe = 'http://localhost:8081';
  window.__env.imageUrl = 'http://localhost:8081/api/application-images/show-image/';
  window.__env.sso = 'https://sso2.viettel.vn:8001/sso';
  window.__env.webPortalURL = 'http://localhost:4200';
  window.__env.appCode = 'DWP';

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
}(this));
