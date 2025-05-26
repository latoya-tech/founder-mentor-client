// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      onProxyReq: (proxyReq) => {
        // You can modify headers here if needed
      },
      onError: (err, req, res) => {
        // Return a proper JSON error instead of text
        res.writeHead(500, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
          error: 'Proxy error',
          message: 'Could not connect to the API server. Make sure it is running on port 3001.'
        }));
      }
    })
  );
};
