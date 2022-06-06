import React from "react";
import { withThemesProvider } from "themeprovider-storybook";

import darkTheme from "theme/dark";
import lightTheme from "theme/light";
import { GlobalStyle } from "styles";

const globalDecorator = StoryFn => (
  <>
    <GlobalStyle />
    <StoryFn />
  </>
);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
};

const themes = [
  {
    name: "Light",
    backgroundColor: lightTheme.colors.background,
    ...lightTheme,
  },
  {
    name: "Dark",
    backgroundColor: darkTheme.colors.background,
    ...darkTheme,
  },
];

export const decorators = [globalDecorator, withThemesProvider(themes)];
