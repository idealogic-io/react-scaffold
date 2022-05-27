import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const CURRENCY = "MATIC";
export const CURRENCY_DECIMAL = 18;

const POLLING_INTERVAL = 12000;

export const CHAIN_ID = {
  MAINNET: 137,
  TESTNET: 80001,
};

export const CHAIN_ID_TO_NAME = {
  [CHAIN_ID.MAINNET]: "Polygon Mainnet",
  [CHAIN_ID.TESTNET]: "Mumbai Testnet",
};

export const supportedChainIds = Object.values(CHAIN_ID);

export const chainRpc = {
  [CHAIN_ID.MAINNET]: "https://rpc-mainnet.matic.network",
  [CHAIN_ID.TESTNET]: "https://rpc-mumbai.matic.today",
};

export const scanUrl = {
  [CHAIN_ID.MAINNET]: "https://polygonscan.com/",
  [CHAIN_ID.TESTNET]: "https://mumbai.polygonscan.com/",
};

export const injectedConnector = new InjectedConnector({ supportedChainIds });

const walletConnect = new WalletConnectConnector({
  rpc: { ...chainRpc },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const connectorByName = {
  injectedConnector,
  walletConnect,
};

export const connectorName = {
  injectedConnector: "injectedConnector",
  walletConnect: "walletConnect",
};

export const getLibrary = provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

export const getChainId = () => {
  return process.env.NODE_ENV === "production" ? CHAIN_ID.MAINNET : CHAIN_ID.TESTNET;
};
