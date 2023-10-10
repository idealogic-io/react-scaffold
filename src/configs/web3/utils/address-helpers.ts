import { getAddress } from "@ethersproject/address";

// returns the checksummed address if the address is valid, otherwise returns false
export const isAddress = (value: string | undefined) => {
  try {
    // Alphabetical letters must be made lowercase for getAddress to work.
    // See documentation here: https://docs.ethers.io/v5/api/utils/address/
    return value ? getAddress(value.toLowerCase()) : false;
  } catch {
    return false;
  }
};
