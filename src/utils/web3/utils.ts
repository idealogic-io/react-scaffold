import { Web3Provider } from "@ethersproject/providers";

import { isGasEstimationError, isUserRejected, TxError } from "utils/web3";

export const getSigner = (library: Web3Provider, account: string) => {
  return library.getSigner(account).connectUnchecked();
};

export const getProviderOrSigner = (library: Web3Provider, account?: string | null | undefined) => {
  return account ? getSigner(library, account) : library;
};

export const getErrorMessage = (error: Error | TxError | string | unknown) => {
  let message = "Sorry, can't perform a transaction";

  if (isUserRejected(error as Error & { code: number })) {
    message = "User rejected the request";
  } else if ((error as TxError)?.data) {
    if (isGasEstimationError(error)) {
      message = "Insufficient funds";
    } else if ((error as TxError)?.data?.message) {
      message = (error as TxError)?.data?.message;
    }
  } else if ((error as Error)?.message) {
    if (isGasEstimationError(error)) {
      message = "Insufficient funds";
    } else {
      message = (error as Error)?.message;
    }
  }

  return message;
};
