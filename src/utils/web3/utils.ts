import { Web3Provider } from "@ethersproject/providers";

// account is not optional
export const getSigner = (library: Web3Provider, account: string) => {
  return library.getSigner(account).connectUnchecked();
};

// account is optional
export const getProviderOrSigner = (library: Web3Provider, account?: string | null | undefined) => {
  return account ? getSigner(library, account) : library;
};
