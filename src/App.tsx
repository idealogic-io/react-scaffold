import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
// Styles
import { GlobalStyle, StyledToastContainer } from "styles";
// Context
import {
  LanguageContextProvider,
  ThemeContextProvider,
  useThemeContext,
  SocketContextProvider,
  Web3Provider,
} from "context";
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
                </SocketContextProvider>
              </Web3Provider>
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
          <ThemedApp />
        </ThemeContextProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default App;
