export class UserRejectedRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserRejectedRequestError";
  }
}

export interface WalletError extends Error {
  code?: number | string;
  reason?: string;
  error?: WalletError;
  data?: {
    originalError?: WalletError;
  };
}

export const getReason = (error: unknown & WalletError): string | undefined => {
  if (!error) {
    return;
  }

  const reason = error.reason ?? error.message;
  const nestedError = error.error ?? error.data?.originalError;

  if (nestedError) {
    return getReason(nestedError);
  }

  return reason;
};

export const isUserReject = (error: unknown & WalletError) => {
  const reason = getReason(error);
  if (
    error?.code === 4001 ||
    // ethers v5.7.0 wrapped error
    error?.code === "ACTION_REJECTED" ||
    // For Rainbow :
    (reason?.match(/request/i) && reason?.match(/reject/i)) ||
    // For Frame:
    reason?.match(/declined/i) ||
    // For SafePal:
    reason?.match(/cancell?ed by user/i) ||
    // For Trust:
    reason?.match(/user cancell?ed/i) ||
    // For Coinbase:
    reason?.match(/user denied/i) ||
    // For Fireblocks
    reason?.match(/user rejected/i) ||
    error instanceof UserRejectedRequestError
  ) {
    return true;
  }
  return false;
};

export const isRequestPending = (error: unknown & WalletError) => {
  return error.code === -32002;
};

export const isGasEstimationError = (error: unknown & WalletError) => {
  const reason = getReason(error);

  return reason?.match(/insufficient funds/);
};

export const getErrorMessage = (error: unknown & WalletError) => {
  let message = "Sorry, can't perform a transaction";
  const reason = getReason(error);

  if (isUserReject(error)) {
    message = "User rejected the request";
  } else if (isGasEstimationError(error)) {
    message = "Insufficient funds";
  } else if (reason) {
    message = reason;
  }

  return message;
};
