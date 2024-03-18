import React, { PropsWithChildren, Suspense } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import { BrowserRouter } from "react-router-dom";
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
import Navigation from "navigation";

const ThemedApp: React.FC = () => {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Suspense fallback={<Loader />}>
        <ErrorBoundary fallbackComponent={ErrorBoundaryFallback}>
          <LanguageContextProvider fallback={<Loader />}>
            <Provider store={store}>
              <Web3Provider>
                <SocketContextProvider>
                  <Modal />
                  <Navigation />
                  <StyledToastContainer />
                  <Updaters />
                </SocketContextProvider>
              </Web3Provider>
            </Provider>
          </LanguageContextProvider>
        </ErrorBoundary>
      </Suspense>
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
    <BrowserRouter>
      <HelmetProvider>
        <ThemeContextProvider>
          <ThemedApp />
        </ThemeContextProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default App;
