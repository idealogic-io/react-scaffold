import { useWeb3React } from "@web3-react/core";

import { tokensList } from "configs";
import { Token } from "types/token";

import { nativeOnChain } from "../native-tokens";
import { MAINNET_CHAIN_IDS } from "../chains";
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
export const useNativeCurrency = () => {
  const { chainId } = useWeb3React();

  return chainId
    ? nativeOnChain(chainId)
    : // display mainnet when not connected
      nativeOnChain(MAINNET_CHAIN_IDS.MAINNET);
};
