import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
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

const ThemedApp: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loader />}>
        <ErrorBoundary fallbackComponent={ErrorBoundaryFallback}>
          <LanguageContextProvider fallback={<Loader />}>
            <Provider store={store}>
              <SocketContextProvider>
                <Modal />
                <Navigation />
                <StyledToastContainer />
              </SocketContextProvider>
            </Provider>
          </LanguageContextProvider>
        </ErrorBoundary>
      </Suspense>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <ThemeContextProvider>
          <GlobalStyle />
          <ThemedApp />
        </ThemeContextProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default App;
