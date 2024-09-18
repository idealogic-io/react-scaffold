// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require("http-proxy-middleware");

const API_PATH = "/api";

const onProxyRes = (proxyRes, req) => {
  const {
    statusCode,
    req: { protocol, host, path },
  } = proxyRes;
  const { method, originalUrl } = req;

  console.warn(`[${method}] [${statusCode}] ${originalUrl} -> ${protocol}//${host}${path}`);
};

module.exports = app => {
  const filesRegex = `^${API_PATH}`;
  app.use(
    createProxyMiddleware(API_PATH, {
      target: process.env.REACT_APP_API_PROXY_URL,
      pathRewrite: { [filesRegex]: "" },
      changeOrigin: true,
      onProxyRes,
    }),
  );
};
