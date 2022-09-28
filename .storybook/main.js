const path = require("path");

module.exports = {
  webpackFinal: async config => {
    config.resolve.modules.push(path.resolve(__dirname, "../src"));

    return config;
  },
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/preset-create-react-app"],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
};
