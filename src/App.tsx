import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { Outlet, ScrollRestoration } from "react-router-dom";
// Styles
import { GlobalStyle, StyledToastContainer } from "styles";
// Context
import { LanguageContextProvider, ThemeContextProvider, useThemeContext, SocketContextProvider } from "context";
// Store
import store from "store/store";
// Components
import { ErrorBoundary, Loader, Modal, ErrorBoundaryFallback } from "components";

const ThemedApp: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Suspense fallback={<Loader />}>
        <LanguageContextProvider fallback={<Loader />}>
          <Provider store={store}>
            <SocketContextProvider>
              <Modal />
              <StyledToastContainer />
              <Outlet />
            </SocketContextProvider>
          </Provider>
        </LanguageContextProvider>
      </Suspense>
    </ThemeProvider>
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
