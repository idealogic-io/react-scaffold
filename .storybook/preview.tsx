import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { GlobalStyle, StyledToastContainer } from "../src/styles";
import { ThemeContextProvider, useThemeContext } from "../src/context";
import { Loader, Modal } from "../src/components";
import store from "../src/store/store";

import "react-toastify/dist/ReactToastify.css";
import "i18next";

const ThemedApp = ({ children }) => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        <Modal />
        <StyledToastContainer />
        {children}
      </Provider>
    </ThemeProvider>
  );
};

const globalDecorator = (StoryFn: React.FC) => {
  return (
    <HelmetProvider>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="use-credentials" />
      <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet" />

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
