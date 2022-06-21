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
// Utils
import { getLibrary } from "utils/web3";
// Hooks
import { useWeb3AutoConnect } from "hooks";
// Types
import { FCWithChildren } from "types";

const Providers: React.FC<FCWithChildren> = ({ children }) => {
  const { theme } = useThemeContext();

  useWeb3AutoConnect();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        <Modal />
        {children}
      </Provider>
    </ThemeProvider>
  );
};

const ProvidersWithContext: React.FC<FCWithChildren> = ({ children }) => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ErrorBoundary fallbackComponent={ErrorBoundaryFallback}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <HelmetProvider>
              <LanguageContextProvider fallback={<Loader />}>
                <ThemeContextProvider>
                  <Providers>{children}</Providers>
                </ThemeContextProvider>
              </LanguageContextProvider>
            </HelmetProvider>
          </Web3ReactProvider>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
};

export default ProvidersWithContext;
