import { toast } from "react-toastify";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
// Configs
import { getChainIds, LOCAL_STORAGE_KEYS, toastOptions } from "configs";
// Utils
import { connectorName, connectorByName, setupNetwork } from "utils/web3";
// TODO translate text here
const useWeb3Login = () => {
  const { activate, deactivate, setError } = useWeb3React();
  // If you want to setup exact network please pass network id
  // Otherwise network id will be first from supported chains
  const login = async (connectorId: keyof typeof connectorName, networkId?: number) => {
    const connector = connectorByName[connectorId];
    localStorage?.setItem(LOCAL_STORAGE_KEYS.connector, connectorId);

    if (connector) {
      const provider = await connector.getProvider();
      const supportedChainIds = getChainIds();
      const chain = networkId ?? supportedChainIds[0];

      await activate(connector, async error => {
        // Check if unsupported network prompt metamask to change chainId
        if (error instanceof UnsupportedChainIdError) {
          setError(error);

          const hasSetup = await setupNetwork(provider, chain);

          if (hasSetup) {
            activate(connector);
          }
        } else {
          window?.localStorage?.removeItem(LOCAL_STORAGE_KEYS.connector);
          if (error instanceof NoEthereumProviderError) {
            toast.error("No provider was found", toastOptions);
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              connectorByName.walletConnect.walletConnectProvider = undefined;
            }

            toast.error("Please authorize to access your account", toastOptions);
          } else if ((error as { code?: number })?.code === -32002) {
            toast.error("Please check metamask, request already pending.", toastOptions);
          } else {
            toast.error(error.message, toastOptions);
          }
        }
      });

      await setupNetwork(provider, chain);
    } else {
      window?.localStorage?.removeItem(LOCAL_STORAGE_KEYS.connector);
      toast.error("Unable to find connector", toastOptions);
    }
  };

  const logout = () => {
    deactivate();
    clearUserState();
  };

  const clearUserState = () => {
    const lsConnector = localStorage.getItem(LOCAL_STORAGE_KEYS.connector);

    if (
      lsConnector &&
      lsConnector in connectorName &&
      (lsConnector === connectorName.walletConnect || lsConnector === connectorName.walletLinkConnector)
    ) {
      const connector = connectorByName[lsConnector as keyof typeof connectorByName];
      (connector as WalletConnectConnector | WalletLinkConnector).close();
    }

    localStorage.removeItem(LOCAL_STORAGE_KEYS.connector);
  };

  return { login, logout };
};

export default useWeb3Login;
