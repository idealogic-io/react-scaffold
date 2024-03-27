import React, { PropsWithChildren, Suspense } from "react";
import { Provider } from "react-redux";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import { Outlet, ScrollRestoration } from "react-router-dom";
// Styles
import { GlobalStyle, StyledToastContainer } from "styles";
// Context
import { LanguageContextProvider, ThemeContextProvider, useThemeContext, SocketContextProvider } from "context";
import {
  useBlockNumber,
  useFetchTokensMap,
  useOrderedConnections,
  useTransactionsUpdater,
  useMulticallUpdater,
} from "configs/web3";
// Store
import store from "store/store";
// Components
import { ErrorBoundary, Loader, Modal, ErrorBoundaryFallback } from "components";

import { shouldForwardProp } from "utils";

const ThemedApp: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <Suspense fallback={<Loader />}>
          <LanguageContextProvider fallback={<Loader />}>
            <Provider store={store}>
              <Web3Provider>
                <SocketContextProvider>
                  <Modal />
                  <StyledToastContainer />
                  <Outlet />
                  <Updaters />
                </SocketContextProvider>
              </Web3Provider>
            </Provider>
          </LanguageContextProvider>
        </Suspense>
      </StyleSheetManager>
    </ThemeProvider>
  );
};

const Updaters: React.FC = () => {
  useBlockNumber();
  useMulticallUpdater();
  useFetchTokensMap();
  useTransactionsUpdater();

  return null;
};

const Web3Provider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const connections = useOrderedConnections();
  const connectors: [Connector, Web3ReactHooks][] = connections.map(({ connector, hooks }) => [connector, hooks]);

  return (
    <Web3ReactProvider connectors={connectors}>
      <Updaters />
      {children}
    </Web3ReactProvider>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary fallbackComponent={ErrorBoundaryFallback}>
      <HelmetProvider>
        <ThemeContextProvider>
          <ThemedApp />
        </ThemeContextProvider>
      </HelmetProvider>

      <ScrollRestoration />
    </ErrorBoundary>
  );
};

export default App;
