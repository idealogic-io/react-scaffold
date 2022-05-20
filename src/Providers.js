import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
// Styles
import { GlobalStyle } from "styles";
// Context
import { useThemeContext } from "context";
// Store
import store from "store/store";
//Components
import { ErrorBoundary, Loader } from "components";

const Providers = ({ children }) => {
  const { theme } = useThemeContext();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary>
            <GlobalStyle />
            {children}
          </ErrorBoundary>
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
