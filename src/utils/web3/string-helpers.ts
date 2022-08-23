import { hexlify } from "@ethersproject/bytes";
import { toUtf8Bytes } from "@ethersproject/strings";

export const utf8ToHex = (string: string) => {
  return hexlify(toUtf8Bytes(string));
};

/**
 * Truncate a transaction or address hash
 */
export const truncateHash = (address: string, startLength = 4, endLength = 4) => {
  if (!address) return "";

  return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`;
};

// Check if address is nullable
export const isNullableAddress = (address: string) => {
  if (!address) {
    return false;
  }

  return address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
};
