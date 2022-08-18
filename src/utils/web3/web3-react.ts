import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

export enum ChainId {
  Mainnet = 137,
  Testnet = 80001,
}

export const CURRENCY = "MATIC";
export const CURRENCY_DECIMAL = 18;

const POLLING_INTERVAL = 12000;
const chainId = getChainId();

export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
  WalletLinkConnector = "walletlinkconnector",
}

export const CHAIN_ID_TO_NAME = {
  [ChainId.Mainnet]: "Polygon Mainnet",
  [ChainId.Testnet]: "Mumbai Testnet",
};

export const chainRpc = {
  [ChainId.Mainnet]: "https://rpc-mainnet.matic.network",
  [ChainId.Testnet]: "https://matic-mumbai.chainstacklabs.com",
};

export const scanUrl = {
  [ChainId.Mainnet]: "https://polygonscan.com",
  [ChainId.Testnet]: "https://mumbai.polygonscan.com",
};

export const injectedConnector = new InjectedConnector({ supportedChainIds: [chainId] });

const walletConnect = new WalletConnectConnector({
  rpc: { [chainId]: getRpcUrl() },
  qrcode: true,
});

const walletLinkConnector = new WalletLinkConnector({
  url: getRpcUrl(),
  appName: "Scaffold",
  appLogoUrl: `${process.env.REACT_APP_URL}/logo512.png`,
  supportedChainIds: [chainId],
});

export const connectorsByName = {
  [ConnectorNames.Injected]: injectedConnector,
  [ConnectorNames.WalletConnect]: walletConnect,
  [ConnectorNames.WalletLinkConnector]: walletLinkConnector,
};

export const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

export function getChainId() {
  return process.env.NODE_ENV === "production" ? ChainId.Mainnet : ChainId.Testnet;
}

export function getRpcUrl() {
  const chainId = getChainId();
  return chainRpc[chainId];
}
