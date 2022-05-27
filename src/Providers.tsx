import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
// Styles
import { GlobalStyle } from "styles";
// Context
import { LanguageContext, ThemeContextProvider, useThemeContext, useTranslation } from "context";
// Store
import store from "store/store";
// Components
import { ErrorBoundary, Loader, Modal } from "components";
// Types
import { FCWithChildren } from "types";

const Providers: React.FC<FCWithChildren> = ({ children }) => {
  const { theme } = useThemeContext();
  const { isFetching } = useTranslation();

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

const ProvidersWithContext: React.FC<FCWithChildren> = ({ children }) => {
  return (
    <ThemeContextProvider>
      <LanguageContext>
        <Providers>{children}</Providers>
      </LanguageContext>
    </ThemeContextProvider>
  );
};

export default ProvidersWithContext;
