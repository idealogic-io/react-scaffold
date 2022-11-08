import { getAddress } from "@ethersproject/address";

/**
 * Truncate a transaction or address hash
 */
export const truncateHash = (address: string, startLength = 4, endLength = 4) => {
  if (!address) return "";

  return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`;
};

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: string) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
