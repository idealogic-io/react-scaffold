import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { isSupportedChain, networkConnection } from "configs/connectors";

export const useSyncNetworkConnection = () => {
  const { chainId, connector } = useWeb3React();

  // Keep the network connector in sync with any active user connector to prevent chain-switching on wallet disconnection.
  useEffect(() => {
    if (chainId && isSupportedChain(chainId) && connector !== networkConnection.connector) {
      networkConnection.connector.activate(chainId);
    }
  }, [chainId, connector]);
};
