import { Connector } from "@web3-react/types";
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { Network } from "@web3-react/network";

import { addChainParameters, isSupportedChain, ChainId } from "configs/connectors";

export const useSwitchChain = () => {
  /**
   * Use only in try/catch because this function can throw an error
   */
  const switchChain = async (connector: Connector, chainId: ChainId) => {
    if (!isSupportedChain(chainId)) {
      throw new Error(`Chain ${chainId} not supported for connector (${typeof connector})`);
    } else {
      try {
        await activateWithChainId(connector, chainId);
      } catch (error) {
        // In activating a new chain, the connector passes through a deactivated state.
        // If we fail to switch chains, it may remain in this state, and no longer be usable.
        // We defensively re-activate the connector to ensure the user does not notice any change.
        try {
          await connector.activate();
        } catch (error) {
          console.error("Failed to re-activate connector", error);
        }

        throw error;
      }
    }
  };

  const activateWithChainId = async (connector: Connector, chainId: ChainId) => {
    if (connector instanceof WalletConnect || connector instanceof Network) {
      await connector.activate(chainId);
    } else {
      await connector.activate(addChainParameters(chainId));
    }
  };

  return { switchChain, activateWithChainId };
};
