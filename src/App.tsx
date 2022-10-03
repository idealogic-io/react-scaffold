import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { Web3ReactProvider } from "@web3-react/core";
import { BrowserRouter } from "react-router-dom";
import { Buffer } from "buffer";
import { toast, ToastContainer } from "react-toastify";
// Solana
import { WalletError } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
// Styles
import { GlobalStyle } from "styles";
// Context
import { LanguageContextProvider, ThemeContextProvider, useThemeContext } from "context";
// Store
import store from "store/store";
// Components
import { ErrorBoundary, Loader, Modal, ErrorBoundaryFallback } from "components";
import Navigation from "navigation";
// Utils
import { getLibrary } from "utils/web3";
import { LOCAL_STORAGE_KEYS, toastOptions } from "configs";
import { solanaNetwork } from "configs/networks";

// @web3-react/walletconnect-connector package uses buffer
// in webpack 5 Buffer is undefined so we add it globally
window.Buffer = Buffer;

const SolanaContext: React.FC = () => {
  const network = solanaNetwork;
  const endpoint = clusterApiUrl(network);

  const wallets = [
    new PhantomWalletAdapter(),
    new GlowWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter({ network }),
    new TorusWalletAdapter(),
    new LedgerWalletAdapter(),
    new SolletExtensionWalletAdapter(),
    new SolletWalletAdapter(),
  ];

  const onError = (error: WalletError) => {
    const message = error.message ? error.message : "Problems with solana wallet were detected";
    toast.error(message, toastOptions);
  };

  // autoConnect works only if LOCAL_STORAGE_KEYS.solanaWallet is exists
  // It will be set after choose solana wallet
  // And will be removed after solana disconnect

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect localStorageKey={LOCAL_STORAGE_KEYS.solanaWallet} onError={onError}>
        <WalletModalProvider>
          <ThemedApp />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const ThemedApp: React.FC = () => {
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

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary fallbackComponent={ErrorBoundaryFallback}>
            <Web3ReactProvider getLibrary={getLibrary}>
              <LanguageContextProvider fallback={<Loader />}>
                <ThemeContextProvider>
                  <SolanaContext />
                </ThemeContextProvider>
              </LanguageContextProvider>
            </Web3ReactProvider>
          </ErrorBoundary>
        </Suspense>
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default App;
