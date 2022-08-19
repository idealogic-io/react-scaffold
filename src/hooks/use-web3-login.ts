import { useCallback } from "react";
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
// Configs
import { LOCAL_STORAGE_KEYS } from "configs";
// Utils
import { ConnectorNames, setupNetwork, connectorsByName } from "utils/web3";

const useWeb3Login = () => {
  const { chainId, activate, deactivate, setError } = useWeb3React();

  const login = useCallback(
    async (connectorId: ConnectorNames) => {
      const connector = connectorsByName[connectorId];
      localStorage?.setItem(LOCAL_STORAGE_KEYS.connector, connectorId);

      try {
        await handleProvider(connector);
      } catch (error) {
        // TODO add ui
        console.error((error as Error)?.message);
        return;
      }

      if (connector) {
        activate(connector, async error => {
          // Check if unsupported network prompt metamask to change chainId
          if (error instanceof UnsupportedChainIdError) {
            const provider = await connector.getProvider();
            const hasSetup = await setupNetwork(provider);

            if (hasSetup) {
              activate(connector);
            } else {
              deactivate();
            }
          } else {
            window?.localStorage?.removeItem(LOCAL_STORAGE_KEYS.connector);
            if (error instanceof NoEthereumProviderError) {
              // TODO add UI error handling
              console.error("No provider was found");
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                connectorsByName.walletconnect.close();
              }
              // TODO add UI error handling
              console.error("Please authorize to access your account");
            } else if ((error as { code?: number })?.code === -32002) {
              // TODO add UI error handling
              console.error("Please check metamask, request already pending.");
            } else {
              // TODO add UI error handling
              console.error(error.message);
            }
          }
        });
      } else {
        window?.localStorage?.removeItem(LOCAL_STORAGE_KEYS.connector);
        // TODO add UI error handling
        console.error("Unable to find connector");
      }
    },
    [activate, setError],
  );

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

  const logout = useCallback(() => {
    deactivate();
    clearUserState();
  }, [deactivate, chainId]);

  const clearUserState = () => {
    const lsConnector = localStorage.getItem(LOCAL_STORAGE_KEYS.connector);

    if (lsConnector === ConnectorNames.WalletConnect || lsConnector === ConnectorNames.WalletLinkConnector) {
      connectorsByName[lsConnector as ConnectorNames.WalletConnect | ConnectorNames.WalletLinkConnector].close();
    }

    localStorage.removeItem(LOCAL_STORAGE_KEYS.connector);
  };

  return { login, logout };
};

export default useWeb3Login;
