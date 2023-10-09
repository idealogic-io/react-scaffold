/**
 * Truncate hash or address
 * @param address ERC20 address
 */
export const truncateHash = (address: string, startLength = 4, endLength = 4) => {
  if (!address) return "";

  return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`;
};

/**
 * Pass string that contains chainId. Returns number or undefined
 * @param chainId string that contain chainId
 */
export const parseChainIdFromString = (chainId: string | null | undefined) => {
  return chainId && !isNaN(parseInt(chainId)) ? parseInt(chainId) : undefined;
};
