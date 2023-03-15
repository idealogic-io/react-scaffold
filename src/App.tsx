import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { Web3ReactProvider } from "@web3-react/core";
import { BrowserRouter } from "react-router-dom";
// Styles
import { GlobalStyle, StyledToastContainer } from "styles";
// Context
import { LanguageContextProvider, ThemeContextProvider, useThemeContext, SocketContextProvider } from "context";
// Store
import store from "store/store";
// Components
import { ErrorBoundary, Loader, Modal, ErrorBoundaryFallback } from "components";
import Navigation from "navigation";
// Utils
import { getLibrary } from "utils/web3";

import { usePollBlockNumber, useTransactionsUpdater, useMulticallUpdater } from "hooks";

const ThemedApp: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Suspense fallback={<Loader />}>
        <ErrorBoundary fallbackComponent={ErrorBoundaryFallback}>
          <LanguageContextProvider fallback={<Loader />}>
            <Provider store={store}>
              <SocketContextProvider>
                <Modal />
                <Navigation />
                <StyledToastContainer />
                <Updaters />
              </SocketContextProvider>
            </Provider>
          </LanguageContextProvider>
        </ErrorBoundary>
      </Suspense>
    </ThemeProvider>
  );
};

const Updaters: React.FC = () => {
  usePollBlockNumber();
  useMulticallUpdater();
  useTransactionsUpdater();
  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <ThemeContextProvider>
            <ThemedApp />
          </ThemeContextProvider>
        </Web3ReactProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default App;
