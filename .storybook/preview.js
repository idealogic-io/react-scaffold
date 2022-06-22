import React from "react";
import { withThemesProvider } from "themeprovider-storybook";
import { BrowserRouter } from "react-router-dom";

import { light, dark } from "../src/theme";
import { GlobalStyle } from "../src/styles";
import { LanguageContextProvider, ThemeContextProvider } from "../src/context";
import { Loader } from "../src/components";

const globalDecorator = StoryFn => (
  <BrowserRouter>
    <LanguageContextProvider fallback={<Loader />}>
      <ThemeContextProvider>
        <GlobalStyle />
        <StoryFn />
      </ThemeContextProvider>
    </LanguageContextProvider>
  </BrowserRouter>
);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
};

const themes = [
  {
    name: "Light",
    backgroundColor: light.colors.background,
    ...light,
  },
  {
    name: "Dark",
    backgroundColor: dark.colors.background,
    ...dark,
  },
];

export const decorators = [globalDecorator, withThemesProvider(themes)];
