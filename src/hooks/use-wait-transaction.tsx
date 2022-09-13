import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { TransactionReceipt, TransactionResponse } from "@ethersproject/providers";
import { toast } from "react-toastify";

import { useTranslation } from "context";
import { toastOptions } from "configs";
import { isGasEstimationError, isUserRejected, TxError } from "utils/web3/error-helpers";
import { ToastDescriptionWithTx } from "components";

export type TxResponse = TransactionResponse | null;

const useWaitTransaction = () => {
  const { library } = useWeb3React();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (error: Error | TxError | string) => {
    let message = "Sorry, can't perform a transaction";

    if ((error as TxError)?.data) {
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

  const handleNormalError = (error: Error | TxError, tx?: TxResponse) => {
    console.warn(error);

    if (tx) {
      toast.error(
        <ToastDescriptionWithTx txHash={tx.hash}>
          {t("Please try again. Confirm the transaction and make sure you are paying enough gas!")}
        </ToastDescriptionWithTx>,
        toastOptions,
      );
    } else {
      toast.error(getErrorMessage(error), toastOptions);
    }
  };

  const fetchWithCatchTxError = async (
    callTx: () => Promise<TransactionResponse>,
  ): Promise<TransactionReceipt | null> => {
    let tx: TxResponse = null;

    try {
      setLoading(true);

      tx = await callTx();
      console.log(tx);

      toast.success(<ToastDescriptionWithTx txHash={tx.hash}>{t("Transaction submitted")}</ToastDescriptionWithTx>);

      const receipt = await tx.wait();

      return receipt;
    } catch (error: any) {
      if (!isUserRejected(error)) {
        if (!tx) {
          handleNormalError(error);
        } else {
          library
            .call(tx, tx.blockNumber)
            .then(() => {
              handleNormalError(error, tx);
            })
            .catch((err: any) => {
              if (isGasEstimationError(err)) {
                handleNormalError(err, tx);
              } else {
                console.warn(err);

                let recursiveErr = err;

                let reason: string | undefined;

                // for MetaMask
                if (recursiveErr?.data?.message) {
                  reason = recursiveErr?.data?.message;
                } else {
                  // for other wallets
                  // Reference
                  // https://github.com/Uniswap/interface/blob/ac962fb00d457bc2c4f59432d7d6d7741443dfea/src/hooks/useSwapCallback.tsx#L216-L222
                  while (recursiveErr) {
                    reason = recursiveErr.reason ?? recursiveErr.message ?? reason;
                    recursiveErr = recursiveErr.error ?? recursiveErr.data?.originalError;
                  }
                }

                const REVERT_STR = "execution reverted: ";
                const indexInfo = reason?.indexOf(REVERT_STR) ?? 0;
                const isRevertedError = indexInfo >= 0;

                if (isRevertedError && reason) {
                  reason = reason.substring(indexInfo + REVERT_STR.length);
                }

                if (tx) {
                  toast.error(
                    <ToastDescriptionWithTx txHash={tx.hash}>
                      {isRevertedError
                        ? `Transaction failed with error: ${reason}`
                        : "Transaction failed. For detailed error message:"}
                    </ToastDescriptionWithTx>,
                  );
                }
              }
            });
        }
      } else {
        toast.error("User denied transaction signature");
      }
    } finally {
      setLoading(false);
    }

    return null;
  };

  return {
    fetchWithCatchTxError,
    loading,
  };
};

export default useWaitTransaction;
