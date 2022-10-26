import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { Web3ReactProvider } from "@web3-react/core";
import { BrowserRouter } from "react-router-dom";
import { Buffer } from "buffer";
import { ToastContainer } from "react-toastify";
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

import { usePollBlockNumber } from "hooks";
import { MulticallUpdater } from "hooks";

// @web3-react/walletconnect-connector package uses buffer
// in webpack 5 Buffer is undefined so we add it globally
window.Buffer = Buffer;

const ThemedApp: React.FC = () => {
  const { theme } = useThemeContext();

  usePollBlockNumber();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        <Modal />
        <Navigation />
        <ToastContainer />
        <Updaters />
      </Provider>
    </ThemeProvider>
  );
};

const Updaters: React.FC = () => {
  return (
    <>
      <MulticallUpdater />
    </>
  );
};

const App: React.FC = () => {
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

export default App;
