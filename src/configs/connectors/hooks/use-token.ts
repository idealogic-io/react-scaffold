import { useWeb3React } from "@web3-react/core";

import { tokensList } from "configs";

import { nativeOnChain } from "../native-tokens";
import { MAINNET_CHAIN_IDS } from "../chains";

import { ChainId } from "../types";
import { Token } from "types/token";

/**
 * Returns hardcoded token from configs
 * @param key one of the key from tokensList[chainId]
 */
export const useToken = (key: string): Token | undefined => {
  const { chainId } = useWeb3React();
  const tokens = chainId ? tokensList[chainId] : {};

  return tokens[key];
};
/**
 * Returns native currency by chain id
 */
export const useNativeCurrency = (chainId: ChainId | null | undefined) => {
  return chainId
    ? nativeOnChain(chainId)
    : // display mainnet when not connected
      nativeOnChain(MAINNET_CHAIN_IDS.MAINNET);
};
