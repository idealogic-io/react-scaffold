import { toast } from "react-toastify";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
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

import { LOCAL_STORAGE_KEYS } from "configs";
import { useTranslation } from "context";

import { connectorName, connectorByName, setupNetwork, getDefaultChainId } from "utils/web3";
import { toastOptionsError } from "components";

const useWeb3Login = () => {
  const { t } = useTranslation();

  const { activate, deactivate, setError } = useWeb3React();

  // If you want to setup exact network please pass network id
  // Otherwise network id will be first from supported chains
  const login = async (connectorId: keyof typeof connectorName, networkId?: number) => {
    const connector = connectorByName[connectorId](networkId);
    localStorage.setItem(LOCAL_STORAGE_KEYS.connector, connectorId);

    if (connector) {
      const provider = await connector.getProvider();
      const chain = getDefaultChainId(networkId);
      let isError = false;
      await handleProvider(connector);

      await activate(connector, async error => {
        isError = true;
        // Check if unsupported network prompt metamask to change chainId
        if (error instanceof UnsupportedChainIdError) {
          setError(error);
          const hasSetup = await setupNetwork(t, provider, chain);

          if (hasSetup) {
            await activate(connector);
          }
        } else {
          localStorage.removeItem(LOCAL_STORAGE_KEYS.connector);
          if (error instanceof NoEthereumProviderError) {
            toast.error(t("No provider was found"), toastOptionsError);
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              connectorByName.walletConnect(networkId).walletConnectProvider = undefined;
            }

            toast.error(t("Please authorize to access your wallet"), toastOptionsError);
          } else if ((error as { code?: number })?.code === -32002) {
            toast.error(t("Please check your external wallet, request is already pending"), toastOptionsError);
          } else {
            toast.error(error.message, toastOptionsError);
          }
        }
      });

      let providerToSetup = provider;
      if (connector instanceof WalletConnectConnector) {
        providerToSetup = connector.walletConnectProvider;
      }

      if (!isError) {
        await setupNetwork(t, providerToSetup, chain);
      }
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.connector);
      toast.error(t("Unable to find connector"), toastOptionsError);
    }
  };

  // handleProvider resolves conflict between several chrome extensions.
  // If you have both Metamask and CoinBase Wallet extension installed
  // CoinBase Wallet has priority on Metamask.
  // In this case when you click on Metamask CoinBase Wallet opens own modal.
  const handleProvider = async (connector: InjectedConnector | WalletConnectConnector | WalletLinkConnector) => {
    try {
      if (connector instanceof InjectedConnector) {
        const provider = await connector.getProvider();

        if (provider?.isMetaMask && !provider?.overrideIsMetaMask) {
          return;
        }

        // If several extensions installed choose metamask as main provider
        if (
          provider &&
          provider?.overrideIsMetaMask &&
          provider?.providers?.length &&
          !provider?.selectedProvider?.isMetaMask
        ) {
          const metamaskProvider = (provider.providers as { isMetaMask?: boolean }[]).find(
            ({ isMetaMask }) => isMetaMask,
          );

          if (metamaskProvider) {
            await provider.setSelectedProvider(metamaskProvider);
          }
        }
      }
    } catch (error) {
      console.error("Error in handleProvider: ", error);
    }
  };

  const logout = async (networkId?: number) => {
    deactivate();
    clearUserState(networkId);
  };

  return { login, logout };
};

const clearUserState = (networkId?: number) => {
  const lsConnector = localStorage.getItem(LOCAL_STORAGE_KEYS.connector);

  if (lsConnector && lsConnector in connectorName && lsConnector === connectorName.walletConnect) {
    const connector = connectorByName[lsConnector](networkId);

    connector.close();
    connector.walletConnectProvider = undefined;
  }

  localStorage.removeItem(LOCAL_STORAGE_KEYS.connector);
};

export { clearUserState, useWeb3Login };
