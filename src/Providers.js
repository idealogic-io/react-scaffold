import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
// Styles
import { GlobalStyle } from "styles";
// Context
import { LanguageContextProvider, ThemeContextProvider, useThemeContext } from "context";
// Store
import store from "store/store";
// Components
import { ErrorBoundary, ErrorBoundaryFallback, Loader, Modal } from "components";

const Providers = ({ children }) => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <GlobalStyle />
          <Modal />
          {children}
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

const ProvidersWithContext = ({ children }) => {
  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary fallbackComponent={ErrorBoundaryFallback}>
        <HelmetProvider>
          <LanguageContextProvider fallback={<Loader />}>
            <ThemeContextProvider>
              <Providers>{children}</Providers>
            </ThemeContextProvider>
          </LanguageContextProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default ProvidersWithContext;
