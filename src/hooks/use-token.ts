import { useWeb3React } from "@web3-react/core";

import { nativeCurrencies, tokensList } from "configs";
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
export const useNativeCurrency = () => {
  const { chainId } = useWeb3React();

  return chainId ? nativeCurrencies[chainId] : undefined;
};
