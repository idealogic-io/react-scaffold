import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";

import { useAccountEventListener, useNativeBalance, useNativeCurrency, useProviders, useWeb3Login } from "hooks";
import { useHandleSearchParams } from "./use-handle-search-params";

import { getDefaultChainId, parseChainIdFromString, setupNetwork } from "utils/web3";
import { getChainIds, LOCAL_STORAGE_KEYS } from "configs";
import { useTranslation } from "context";
import { SEARCH_PARAMS } from "navigation/routes";

import { Connector } from "types";

export const useHandleData = () => {
  const { t } = useTranslation();
  const { chainId, account, active, library, error } = useWeb3React();
  const { balance: nativeBalance } = useNativeBalance();
  const { providers } = useProviders();
  const { logout, login } = useWeb3Login();

  const nativeCurrency = useNativeCurrency();
  const { chainIdFromSearchParams, setSearchParams } = useHandleSearchParams();

  const supportedChains = getChainIds();
  const isUnsupportedChainId = error instanceof UnsupportedChainIdError;
  const isDifferentNetwork = active && chainId !== chainIdFromSearchParams;

  useAccountEventListener(handleUpdateEvent);

  function handleUpdateEvent(payload: { chainId?: string; account?: string[] }) {
    if (payload.chainId) {
      const chain = getDefaultChainId(parseChainIdFromString(payload.chainId));
      changeChainHandler(chain);
    }
  }

  const onConnect = (walletConfig: Connector) => {
    const { href, connectorId } = walletConfig;
    if (!window.ethereum && href) {
      window.open(href, "_blank", "noopener noreferrer");
    } else {
      login(connectorId);
    }
  };

  const changeChainHandler = async (chainId: number | undefined) => {
    const connectorId = localStorage.getItem(LOCAL_STORAGE_KEYS.connector);

    if (connectorId && chainId) {
      const isSetup = await setupNetwork(t, library?.provider, chainId);

      if (isSetup) {
        setSearchParams({ [SEARCH_PARAMS.chainId]: chainId.toString() });
      }
    }
  };

  return {
    chainIdFromSearchParams,
    chainId,
    account,
    active,
    nativeBalance,
    nativeCurrency,
    providers,
    supportedChains,
    isUnsupportedChainId,
    isDifferentNetwork,
    logout,
    onConnect,
    changeChainHandler,
  };
};
