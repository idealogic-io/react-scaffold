import { toast } from "react-toastify";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { AbstractConnector } from "@web3-react/abstract-connector";
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
// Configs
import { getChainIds, LOCAL_STORAGE_KEYS, toastError } from "configs";
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

    try {
      await handleProvider(connector);
    } catch (error) {
      toast.error(`${(error as Error)?.message}`, toastError);
      return;
    }

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
            toast.error("No provider was found", toastError);
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              connectorByName.walletConnect.walletConnectProvider = undefined;
            }

            toast.error("Please authorize to access your account", toastError);
          } else if ((error as { code?: number })?.code === -32002) {
            toast.error("Please check metamask, request already pending.", toastError);
          } else {
            toast.error(error.message, toastError);
          }
        }
      });

      await setupNetwork(provider, chain);
    } else {
      window?.localStorage?.removeItem(LOCAL_STORAGE_KEYS.connector);
      toast.error("Unable to find connector", toastError);
    }
  };

  // handleProvider resolves conflict between several chrome extensions.
  // If you have both Metamask and CoinBase Wallet extension installed
  // CoinBase Wallet has priority on Metamask.
  // In this case when you click on Metamask CoinBase Wallet opens own modal.
  const handleProvider = async (connector: AbstractConnector) => {
    if (connector instanceof InjectedConnector) {
      const provider = await connector.getProvider();

      // If single metamask extension installed return
      if (provider?.isMetaMask && !provider?.overrideIsMetaMask) {
        return;
      }
      // If several extensions installed choose metamask as main provider
      else if (provider && provider?.overrideIsMetaMask && provider?.providers.length) {
        const metamaskProvider = (provider.providers as [any]).find(({ isMetaMask }) => isMetaMask);

        if (metamaskProvider) {
          provider.setSelectedProvider(metamaskProvider);
        }
      }
      // If no metamask extension detected throw error
      else {
        throw new Error("Metamask is not Installed");
      }
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
