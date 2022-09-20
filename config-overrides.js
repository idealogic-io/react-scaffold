const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

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
    crypto: false,
    util: false,
    stream: false,
    ...webpackConfig.resolve.fallback,
  };

  return webpackConfig;
};
