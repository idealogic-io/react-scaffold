import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
// Styles
import { GlobalStyle } from "styles";
// Context
import { LanguageContextProvider, ThemeContextProvider, useThemeContext } from "context";
// Store
import store from "store/store";
// Components
import { ErrorBoundary, Loader, Modal, ErrorBoundaryFallback } from "components";
import Navigation from "navigation";

const ThemedApp: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        <Modal />
        <Navigation />
      </Provider>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary fallbackComponent={ErrorBoundaryFallback}>
            <LanguageContextProvider fallback={<Loader />}>
              <ThemeContextProvider>
                <ThemedApp />
              </ThemeContextProvider>
            </LanguageContextProvider>
          </ErrorBoundary>
        </Suspense>
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default App;
