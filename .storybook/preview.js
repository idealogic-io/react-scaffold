import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { GlobalStyle, StyledToastContainer } from "../src/styles";
import { LanguageContextProvider, ThemeContextProvider, useThemeContext } from "../src/context";
import { Loader, Modal } from "../src/components";
import store from "../src/store/store";

import "react-toastify/dist/ReactToastify.css";

const ThemedApp = ({ children }) => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <LanguageContextProvider fallback={<Loader />}>
        <Provider store={store}>
          <GlobalStyle />
          <Modal />
          <StyledToastContainer />
          {children}
        </Provider>
      </LanguageContextProvider>
    </ThemeProvider>
  );
};

const globalDecorator = StoryFn => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeContextProvider>
          <ThemedApp>
            <StoryFn />
          </ThemedApp>
        </ThemeContextProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export const decorators = [globalDecorator];
