import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { Web3ReactProvider } from "@web3-react/core";
import { BrowserRouter } from "react-router-dom";
// Styles
import { GlobalStyle } from "styles";
// Context
import { LanguageContextProvider, ThemeContextProvider, useThemeContext } from "context";
// Store
import store from "store/store";
// Components
import { ErrorBoundary, Loader, Modal, ErrorBoundaryFallback } from "components";
import Navigation from "navigation";
// Utils
import { getLibrary } from "utils/web3";
// Hooks
import { useWeb3AutoConnect } from "hooks";

const ThemedApp: React.FC = () => {
  const { theme } = useThemeContext();

  useWeb3AutoConnect();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        <Modal />
        <Navigation />
      </Provider>
    </ThemeProvider>
  );
};

const ProvidersWithContext: React.FC = () => {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary fallbackComponent={ErrorBoundaryFallback}>
            <Web3ReactProvider getLibrary={getLibrary}>
              <LanguageContextProvider fallback={<Loader />}>
                <ThemeContextProvider>
                  <ThemedApp />
                </ThemeContextProvider>
              </LanguageContextProvider>
            </Web3ReactProvider>
          </ErrorBoundary>
        </Suspense>
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default ProvidersWithContext;
