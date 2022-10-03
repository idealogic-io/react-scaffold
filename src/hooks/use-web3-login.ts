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
import { useWallet } from "@solana/wallet-adapter-react";
// Configs
import { getChainIds, LOCAL_STORAGE_KEYS, toastOptions } from "configs";
// Utils
import { connectorName, connectorByName, setupNetwork } from "utils/web3";

// TODO check translation
const useWeb3Login = () => {
  const { activate, deactivate, setError } = useWeb3React();
  const { disconnect } = useWallet();

  // If you want to setup exact network please pass network id
  // Otherwise network id will be first from supported chains
  const login = async (connectorId: keyof typeof connectorName, networkId?: number) => {
    // Disconnect from solana wallet on login through web3
    await disconnect();

    const connector = connectorByName[connectorId];
    localStorage?.setItem(LOCAL_STORAGE_KEYS.connector, connectorId);

    if (connector) {
      const provider = await connector.getProvider();
      const supportedChainIds = getChainIds();
      const chain = networkId && supportedChainIds.includes(networkId) ? networkId : supportedChainIds[0];
      let isError = false;
      await handleProvider(connector);

      await activate(connector, async error => {
        isError = true;
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
            toast.error("Please check the wallet, request is already pending.", toastOptions);
          } else {
            toast.error(error.message, toastOptions);
          }
        }
      });

      if (!isError) {
        await setupNetwork(provider, chain);
      }
    } else {
      window?.localStorage?.removeItem(LOCAL_STORAGE_KEYS.connector);
      toast.error("Unable to find connector", toastOptions);
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
      console.error((error as Error)?.message);
    }
  };

  const logout = () => {
    deactivate();
    clearUserState();
    // Disconnect from solana wallet
    disconnect();
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
