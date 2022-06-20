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
      target: "http://18.135.218.230:8000",
      pathRewrite: { [filesRegex]: "" },
      changeOrigin: true,
      onProxyRes,
    }),
  );
};
