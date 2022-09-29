const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/dev/api',
    createProxyMiddleware({
      target: 'https://bznsz7ay77.execute-api.eu-central-1.amazonaws.com',
      changeOrigin: true,
    })
  );
};
