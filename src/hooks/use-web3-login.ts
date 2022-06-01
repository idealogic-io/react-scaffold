import { useCallback } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";
// Configs
import { LOCAL_STORAGE_KEYS } from "configs";
// Context
import { useTranslation } from "context";
// Utils
import { ConnectorNames, setupNetwork, connectorsByName } from "utils/web3";

const useWeb3Login = () => {
  const { t } = useTranslation();
  const { chainId, activate, deactivate, setError } = useWeb3React();

  const login = useCallback(
    async (connectorId: ConnectorNames) => {
      const connector = connectorsByName[connectorId];

      if (connector) {
        activate(connector, async error => {
          // Check if unsupported network prompt metamask to change chainId
          if (error instanceof UnsupportedChainIdError) {
            const provider = await connector.getProvider();
            const hasSetup = await setupNetwork(provider);
            if (hasSetup) {
              activate(connector);
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
                const walletConnector = connector;
                walletConnector.walletConnectProvider = null;
              }
              // TODO add UI error handling
              console.error("Please authorize to access your account");
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
    [t, activate, setError],
  );

  const logout = useCallback(() => {
    deactivate();
  }, [deactivate, chainId]);

  return { login, logout };
};

export default useWeb3Login;
