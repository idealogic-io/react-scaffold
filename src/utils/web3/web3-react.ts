import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { getChainIds, rpcUrls } from "configs/networks";

const POLLING_INTERVAL = 12000;

export const connectorName = {
  injectedConnector: "injectedConnector",
  walletConnect: "walletConnect",
  walletLinkConnector: "walletLinkConnector",
};

const supportedChainIds = getChainIds();

export const injectedConnector = new InjectedConnector({ supportedChainIds });

const walletConnect = new WalletConnectConnector({
  rpc: {
    ...rpcUrls,
  },
  supportedChainIds,
  qrcode: true,
});

const walletLinkConnector = new WalletLinkConnector({
  url: process.env.DOMAIN as string,
  appName: "Scaffold",
  appLogoUrl: `${process.env.REACT_APP_URL}/logo512.png`,
  supportedChainIds,
});

export const connectorByName = {
  injectedConnector,
  walletConnect,
  walletLinkConnector,
};

export const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};
