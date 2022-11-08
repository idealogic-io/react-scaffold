import { Web3Provider } from "@ethersproject/providers";

import { Token } from "@pancakeswap/sdk";
import { NATIVE_ADDRESS } from "./constants";

// account is not optional
export const getSigner = (library: Web3Provider, account: string) => {
  return library.getSigner(account).connectUnchecked();
};

// account is optional
export const getProviderOrSigner = (library: Web3Provider, account?: string | null | undefined) => {
  return account ? getSigner(library, account) : library;
};

export const isExceededBalance = ({
  token,
  tokenBalance,
  nativeBalance,
  gasEstimation,
  value,
}: {
  token: Token | undefined;
  tokenBalance: number;
  nativeBalance: number;
  gasEstimation: number;
  value: number;
}) => {
  if (!token) {
    return true;
  }

  const isNative = token.address.toLowerCase() === NATIVE_ADDRESS;

  if (isNative) {
    return gasEstimation + value > nativeBalance;
  } else {
    return tokenBalance < value || nativeBalance < gasEstimation;
  }
};
