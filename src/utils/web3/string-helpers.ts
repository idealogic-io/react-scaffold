import { getAddress } from "@ethersproject/address";
import { NATIVE_ADDRESS } from "./constants";

/**
 * Truncate hash or address
 * @param address ERC20 address
 */
export const truncateHash = (address: string, startLength = 4, endLength = 4) => {
  if (!address) return "";

  return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`;
};

/**
 * Check if address is valid
 * @param value ERC20 address
 */
export function isAddress(value: string) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
/**
 * Pass string that contains chainId. Returns number or undefined
 * @param chainId string that contain chainId
 */
export const parseChainIdFromString = (chainId: string | null | undefined) => {
  return chainId && !isNaN(parseInt(chainId)) ? parseInt(chainId) : undefined;
};
/**
 * Returns true if token address is native
 * @param tokenAddress ERC20 address
 */
export const isTokenNative = (tokenAddress?: string) => {
  return tokenAddress?.toLowerCase() === NATIVE_ADDRESS;
};
