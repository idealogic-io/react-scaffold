import { getAddress } from "@ethersproject/address";

// returns the checksummed address if the address is valid, otherwise returns false
export const isAddress = (value: any) => {
  try {
    // Alphabetical letters must be made lowercase for getAddress to work.
    // See documentation here: https://docs.ethers.io/v5/api/utils/address/
    return getAddress(value.toLowerCase());
  } catch {
    return false;
  }
};
