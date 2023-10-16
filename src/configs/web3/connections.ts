import { initializeConnector } from "@web3-react/core";
import { Network } from "@web3-react/network";
import { MetaMask } from "@web3-react/metamask";
import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { Connector } from "@web3-react/types";

import CoinBaseIcon from "components/svg/icons/CoinBase";
import WalletConnectIcon from "components/svg/icons/WalletConnect";

import { Connection, RPC_PROVIDERS, MAINNET_CHAIN_IDS, RPC_URLS } from "./";
import {
  getInjection,
  getIsCoinbaseWalletBrowser,
  getIsGenericInjector,
  getIsInjectedMobileBrowser,
  getIsMetaMaskWallet,
  getShouldAdvertiseMetaMask,
} from "./utils";
import { isMobile } from "utils";

import { ConnectionType } from "./types";

const URL = process.env.REACT_APP_URL;

const onError = (error: Error) => {
  console.error("web3-react error:", error);
};

const [network, networkHooks] = initializeConnector<Network>(
  actions => new Network({ actions, urlMap: RPC_PROVIDERS, defaultChainId: MAINNET_CHAIN_IDS.MAINNET }),
);

export const networkConnection: Connection = {
  getName: () => "Network",
  connector: network,
  hooks: networkHooks,
  type: ConnectionType.NETWORK,
  shouldDisplay: () => false,
};

const [injected, injectedHooks] = initializeConnector<MetaMask>(actions => new MetaMask({ actions, onError }));

export const injectedConnection: Connection = {
  getName: () => getInjection().name,
  connector: injected,
  hooks: injectedHooks,
  type: ConnectionType.INJECTED,
  getIcon: () => getInjection().icon,
  shouldDisplay: () => getIsMetaMaskWallet() || getShouldAdvertiseMetaMask() || getIsGenericInjector(),

  // If on non-injected, non-mobile browser, prompt user to install Metamask
  overrideActivate: () => {
    if (getShouldAdvertiseMetaMask()) {
      window.open("https://metamask.io/", "inst_metamask");
      return true;
    }
    return false;
  },
};

const [coinbaseWallet, coinbaseWalletHooks] = initializeConnector<CoinbaseWallet>(
  actions =>
    new CoinbaseWallet({
      actions,
      options: {
        url: RPC_URLS[MAINNET_CHAIN_IDS.MAINNET],
        appName: "Scaffold",
        appLogoUrl: `${URL}/logo192.png`,
        reloadOnDisconnect: false,
      },
      onError,
    }),
);

export const coinbaseWalletConnection: Connection = {
  getName: () => "Coinbase Wallet",
  connector: coinbaseWallet,
  hooks: coinbaseWalletHooks,
  type: ConnectionType.COINBASE_WALLET,
  getIcon: () => CoinBaseIcon,
  shouldDisplay: () => !!((isMobile && !getIsInjectedMobileBrowser()) || !isMobile || getIsCoinbaseWalletBrowser()),
  // If on a mobile browser that isn't the coinbase wallet browser, deeplink to the coinbase wallet app
  overrideActivate: () => {
    if (isMobile && !getIsInjectedMobileBrowser()) {
      window.open(`https://go.cb-w.com/dapp?cb_url=${URL}`, "cbwallet");
      return true;
    }
    return false;
  },
};

const [mainnet, ...optionalChains] = Object.values(MAINNET_CHAIN_IDS);

const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
  actions =>
    new WalletConnect({
      actions,
      defaultChainId: mainnet,
      onError,
      options: {
        projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID as string,
        chains: [mainnet],
        optionalChains: [mainnet, ...optionalChains],
        showQrModal: true,
        rpcMap: RPC_URLS,
        optionalMethods: ["eth_signTypedData", "eth_signTypedData_v4", "eth_sign"],
        qrModalOptions: {
          desktopWallets: undefined,
          enableExplorer: true,
          explorerExcludedWalletIds: undefined,
          explorerRecommendedWalletIds: undefined,
          mobileWallets: undefined,
          privacyPolicyUrl: undefined,
          termsOfServiceUrl: undefined,
        },
      },
    }),
);

export const walletConnectV2Connection: Connection = {
  getName: () => "WalletConnect",
  connector: walletConnect,
  hooks: walletConnectHooks,
  type: ConnectionType.WALLET_CONNECT_V2,
  getIcon: () => WalletConnectIcon,
  shouldDisplay: () => !getIsInjectedMobileBrowser(),
  overrideActivate: () => {
    return false;
  },
};

export const getConnections = () => {
  return [injectedConnection, walletConnectV2Connection, coinbaseWalletConnection, networkConnection];
};

export const getConnection = (connector: Connector | ConnectionType) => {
  if (connector instanceof Connector) {
    const connection = getConnections().find(connection => connection.connector === connector);

    if (!connection) {
      throw Error("unsupported connector");
    }

    return connection;
  } else {
    switch (connector) {
      case ConnectionType.INJECTED:
        return injectedConnection;
      case ConnectionType.COINBASE_WALLET:
        return coinbaseWalletConnection;
      case ConnectionType.WALLET_CONNECT_V2:
        return walletConnectV2Connection;
      case ConnectionType.NETWORK:
        return networkConnection;
    }
  }
};
