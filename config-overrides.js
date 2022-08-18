const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

module.exports = function override(webpackConfig) {
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });

  webpackConfig.ignoreWarnings = [/Failed to parse source map/];

  webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
    plugin => !(plugin instanceof ModuleScopePlugin),
  );

  return webpackConfig;
};
