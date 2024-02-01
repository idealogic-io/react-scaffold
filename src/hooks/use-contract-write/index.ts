import { useState } from "react";
import { toast } from "react-toastify";
import { useNetwork, usePrepareContractWrite, useContractWrite as useWagmiWrite } from "wagmi";
import { useTranslation } from "react-i18next";

import { useContractWriteWait } from "hooks";

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
  const { updateCallback, successCallback, errorCallback, waitMode } = configs ?? {};

  const [trxHash, setTrxHash] = useState<`0x${string}` | undefined>(undefined);
  const [trxLink, setTrxLink] = useState<string | undefined>(undefined);
  const [isWaiting, setIsWaiting] = useState(false);

  const { t } = useTranslation("translation", { keyPrefix: "Transactions" });
  const { chain } = useNetwork();

  const { config, isSuccess } = usePrepareContractWrite({
    ...data,
  });

  const { writeAsync } = useWagmiWrite(config as UseContractWriteConfig<TAbi, TFunctionName, "prepared">);

  useContractWriteWait(
    {
      hash: trxHash,
      chainId: data.chainId,
      contractAddress: data.address,
      methodName: data.functionName,
    },
    {
      loaderController: setIsWaiting,
      hashUpdate: setTrxHash,
      waitMode,
      updateCallback,
      successCallback,
      errorCallback,
    },
  );

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
          toast.error(error?.shortMessage ?? t("trxError"));
        });
    }
  };

  return { write: writeHandler, isWaiting, isSuccess, trxLink };
};
