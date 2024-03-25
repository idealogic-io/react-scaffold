// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require("http-proxy-middleware");

const API_PATH = "/api";
const TOKENS_PATH = "/assets/main/*.json";

const apiPathRegex = `^${API_PATH}`;

const onProxyRes = (proxyRes, req) => {
  const {
    statusCode,
    req: { protocol, host, path },
  } = proxyRes;
  const { method, originalUrl } = req;

  console.warn(`[${method}] [${statusCode}] ${originalUrl} -> ${protocol}//${host}${path}`);
};

module.exports = app => {
  app.use(
    createProxyMiddleware(API_PATH, {
      target: process.env.REACT_APP_API_PROXY_URL,
      pathRewrite: { [apiPathRegex]: "" },
      changeOrigin: true,
      onProxyRes,
    }),
  );

  app.use(
    createProxyMiddleware(TOKENS_PATH, {
      target: process.env.REACT_APP_TOKENS_PROXY_URL,
      changeOrigin: true,
      onProxyRes,
    }),
  );
};
