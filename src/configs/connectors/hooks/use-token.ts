import { nativeOnChain } from "../native-tokens";
import { MAINNET_CHAIN_IDS } from "../chains";

import { ChainId } from "../types";

/**
 * Returns native currency by chain id
 */
export const useNativeCurrency = (chainId: ChainId | null | undefined) => {
  return chainId
    ? nativeOnChain(chainId)
    : // display mainnet when not connected
      nativeOnChain(MAINNET_CHAIN_IDS.MAINNET);
};
