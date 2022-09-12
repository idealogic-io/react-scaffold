import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";

import { GlobalStyle } from "../src/styles";
import { LanguageContextProvider, ThemeContextProvider, useThemeContext } from "../src/context";
import { Loader, Modal } from "../src/components";
import store from "../src/store/store";

const ThemedApp = ({ children }) => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        <Modal />
        <ToastContainer />
        {children}
      </Provider>
    </ThemeProvider>
  );
};

const globalDecorator = StoryFn => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LanguageContextProvider fallback={<Loader />}>
          <ThemeContextProvider>
            <ThemedApp>
              <StoryFn />
            </ThemedApp>
          </ThemeContextProvider>
        </LanguageContextProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export const decorators = [globalDecorator];
