const { createProxyMiddleware } = require("http-proxy-middleware");

const FILES_PATH = "/api";

const onProxyRes = (proxyRes, req) => {
  const {
    statusCode,
    req: { protocol, host, path },
  } = proxyRes;
  const { method, originalUrl } = req;

  // eslint-disable-next-line no-console
  console.log(`[${method}] [${statusCode}] ${originalUrl} -> ${protocol}//${host}${path}`);
};

module.exports = app => {
  const filesRegex = `^${FILES_PATH}`;
  app.use(
    createProxyMiddleware(FILES_PATH, {
      target: process.env.REACT_APP_API_PROXY_URL,
      pathRewrite: { [filesRegex]: "" },
      changeOrigin: true,
      onProxyRes,
    }),
  );
};
