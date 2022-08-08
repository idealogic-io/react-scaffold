import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Styles
import { GlobalStyle } from "styles";
// Context
import { LanguageContextProvider, ThemeContextProvider, useThemeContext } from "context";
// Store
import store from "store/store";
// Components
import { ErrorBoundary, ErrorBoundaryFallback, Loader, Modal } from "components";
import Navigation from "navigation";

const ThemedApp = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        <Modal />
        <Navigation />
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ErrorBoundary fallbackComponent={ErrorBoundaryFallback}>
          <HelmetProvider>
            <LanguageContextProvider fallback={<Loader />}>
              <ThemeContextProvider>
                <ThemedApp />
              </ThemeContextProvider>
            </LanguageContextProvider>
          </HelmetProvider>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
