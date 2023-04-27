type ErrorData = {
  code: number | string;
  message: string;
};

export type TxError = {
  data: ErrorData;
  error: string;
};

/**
 * Check for insufficient funds for gas * price + value
 */
export const isGasEstimationError = (error: TxError | Error | string) => {
  if ((error as Error).message.includes("insufficient funds")) {
    return true;
  } else {
    return false;
  }
};
/**
 * Checks if error is about rejected transaction
 */
export const isUserRejected = (err: ErrorData) => {
  return typeof err === "object" && "code" in err && (err.code === 4001 || err.code === "ACTION_REJECTED");
};
