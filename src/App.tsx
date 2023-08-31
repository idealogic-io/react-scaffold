import React, { Suspense } from "react";
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
import { useBlockNumber, useFetchTokensMap, useOrderedConnections } from "configs/connectors";

// Store
import store from "store/store";
// Components
import { ErrorBoundary, Loader, Modal, ErrorBoundaryFallback } from "components";
// import Navigation from "navigation";

import Web3Page from "pages/web3";
import { useMulticallUpdater } from "hooks";

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
                {/* <ConnectorsPage /> */}
                <Web3Page />
                {/* <Navigation /> */}
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
  useBlockNumber();
  useMulticallUpdater();
  useFetchTokensMap();
  // useTransactionsUpdater();
  return null;
};

const connections = useOrderedConnections();
const connectors: [Connector, Web3ReactHooks][] = connections.map(({ connector, hooks }) => [connector, hooks]);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Web3ReactProvider connectors={connectors}>
          <ThemeContextProvider>
            <ThemedApp />
          </ThemeContextProvider>
        </Web3ReactProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default App;
