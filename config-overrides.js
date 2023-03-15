const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const webpack = require("webpack");

module.exports = function override(webpackConfig) {
  webpackConfig.module.rules.push(
    {
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    },
    {
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    },
  );

  webpackConfig.ignoreWarnings = [/Failed to parse source map/];

  webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
    plugin => !(plugin instanceof ModuleScopePlugin),
  );

  webpackConfig.resolve.fallback = {
    ...webpackConfig.resolve.fallback,
    crypto: false,
    stream: false,
  };

  webpackConfig.plugins = [
    ...webpackConfig.plugins,
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
  ];

  return webpackConfig;
};
