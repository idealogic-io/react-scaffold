const webpack = require("webpack");

module.exports = function override(webpackConfig) {
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });

  webpackConfig.ignoreWarnings = [/Failed to parse source map/];
  return webpackConfig;
};
