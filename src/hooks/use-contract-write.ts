import { useState } from "react";
import { toast } from "react-toastify";
import { useNetwork, usePrepareContractWrite, useContractWrite as useWagmiWrite, useWaitForTransaction } from "wagmi";

import type { UsePrepareContractWriteConfig, UseContractWriteConfig } from "wagmi";
import type { WriteContractMode } from "@wagmi/core";
import { type TransactionExecutionError } from "viem";
import type { Abi } from "abitype";

export const useContractWrite = <
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TChainId extends number,
  TMode extends WriteContractMode = undefined,
>(
  data: UsePrepareContractWriteConfig<TAbi, TFunctionName, TChainId>,
  updateCallback?: () => void,
) => {
  const [trxHash, setTrxHash] = useState<`0x${string}` | undefined>(undefined);
  const [trxLink, setTrxLink] = useState<string | undefined>(undefined);
  const [isWaiting, setIsWaiting] = useState(false);

  const { chain } = useNetwork();

  const { config, isSuccess } = usePrepareContractWrite({
    ...data,
  });

  const { writeAsync } = useWagmiWrite(config as unknown as UseContractWriteConfig<TAbi, TFunctionName, TMode>);

  useWaitForTransaction({
    chainId: data.chainId,
    hash: trxHash,
    onSuccess() {
      toast.success("Transaction successful");
      setIsWaiting(false);
      setTrxHash(undefined);
      if (updateCallback) {
        updateCallback();
      }
    },
    onError(error) {
      toast.error(error?.message ?? "Transaction error");
      setIsWaiting(false);
      setTrxHash(undefined);
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
          if (updateCallback) {
            updateCallback();
          }
          toast.error(error?.shortMessage ?? "Transaction error");
        });
    }
  };

  return { write: writeHandler, isWaiting, isSuccess, trxLink };
};
