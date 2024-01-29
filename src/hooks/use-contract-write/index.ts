import { useState } from "react";
import { toast } from "react-toastify";
import { useNetwork, usePrepareContractWrite, useContractWrite as useWagmiWrite, useWaitForTransaction } from "wagmi";

import type { UseContractWriteConfig, UsePrepareContractWriteConfig } from "wagmi";
import { type TransactionExecutionError } from "viem";
import type { Abi } from "abitype";
import type { UseContractWriteHookConfigs } from "./types";

export const useContractWrite = <
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TChainId extends number,
>(
  data: UsePrepareContractWriteConfig<TAbi, TFunctionName, TChainId>,
  configs?: UseContractWriteHookConfigs,
) => {
  const { updateCallback, successCallback, errorCallback } = configs ?? {};

  const [trxHash, setTrxHash] = useState<`0x${string}` | undefined>(undefined);
  const [trxLink, setTrxLink] = useState<string | undefined>(undefined);
  const [isWaiting, setIsWaiting] = useState(false);

  const { chain } = useNetwork();

  const { config, isSuccess } = usePrepareContractWrite({
    ...data,
  });

  const { writeAsync } = useWagmiWrite(config as UseContractWriteConfig<TAbi, TFunctionName, "prepared">);

  useWaitForTransaction({
    chainId: data.chainId,
    hash: trxHash,
    onSuccess() {
      toast.success("Transaction successful");
      setIsWaiting(false);
      setTrxHash(undefined);
      if (successCallback) {
        successCallback();
      }
      if (updateCallback) {
        updateCallback();
      }
    },
    onError(error) {
      toast.error(error?.message ?? "Transaction error");
      setIsWaiting(false);
      setTrxHash(undefined);
      if (errorCallback) {
        errorCallback();
      }
      if (updateCallback) {
        updateCallback();
      }
    },
  });

  const writeHandler = () => {
    if (isSuccess && writeAsync) {
      setIsWaiting(true);
      setTrxLink(undefined);
      writeAsync()
        .then(trxData => {
          setTrxHash(trxData.hash);
          setTrxLink(chain?.blockExplorers?.default.url + "/tx/" + trxData.hash);
        })
        .catch((error: TransactionExecutionError) => {
          setIsWaiting(false);
          if (errorCallback) {
            errorCallback();
          }
          if (updateCallback) {
            updateCallback();
          }
          toast.error(error?.shortMessage ?? "Transaction error");
        });
    }
  };

  return { write: writeHandler, isWaiting, isSuccess, trxLink };
};
