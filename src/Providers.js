import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { Web3ReactProvider } from "@web3-react/core";
// Styles
import { GlobalStyle } from "styles";
// Context
import { LanguageContext, ThemeContextProvider, useThemeContext, useTranslation } from "context";
// Store
import store from "store/store";
// Components
import { ErrorBoundary, Loader, Modal } from "components";
// Utils
import { getLibrary } from "utils/web3";
// Hooks
import { useWeb3AutoConnect } from "hooks";

const Providers = ({ children }) => {
  const { theme } = useThemeContext();
  const { isFetching } = useTranslation();

  useWeb3AutoConnect();

  return (
    <HelmetProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <GlobalStyle />
              <Modal />
              {isFetching ? <Loader /> : children}
            </ErrorBoundary>
          </Suspense>
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  );
};

const ProvidersWithContext = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeContextProvider>
        <LanguageContext>
          <Providers>{children}</Providers>
        </LanguageContext>
      </ThemeContextProvider>
    </Web3ReactProvider>
  );
};

export default ProvidersWithContext;
