import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

import { getChainIds, rpcUrls } from "configs/networks";
import packages from "../../../package.json";

const POLLING_INTERVAL = 12000;
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID as string;

export const connectorName = {
  injectedConnector: "injectedConnector",
  walletConnect: "walletConnect",
  walletLinkConnector: "walletLinkConnector",
} as const;

const supportedChainIds = getChainIds();

export const injectedConnector = (_?: number) => new InjectedConnector({ supportedChainIds });

const walletConnect = (_?: number) =>
  new WalletConnectConnector({
    rpc: {
      ...rpcUrls,
    },
    supportedChainIds,
    qrcode: true,
  });

const walletLinkConnector = (chainId?: number) =>
  new WalletLinkConnector({
    url: rpcUrls[getDefaultChainId(chainId)],
    appName: packages.name,
    appLogoUrl: `${process.env.REACT_APP_URL}/logo512.png`,
    supportedChainIds,
  });

export const connectorByName = {
  injectedConnector,
  walletConnect,
  walletLinkConnector,
};
/**
 * If incoming chain id is not supported returns chain id from env
 * @param chainId
 */
export function getDefaultChainId(chainId?: number) {
  return chainId && supportedChainIds.includes(chainId) ? chainId : +CHAIN_ID;
}

export const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};
