import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNetwork, usePrepareContractWrite, useContractWrite as useWagmiWrite, useWaitForTransaction } from "wagmi";

import type { UsePrepareContractWriteConfig, UseContractWriteConfig } from "wagmi";
import type { WriteContractMode } from "@wagmi/core";
import type { Abi } from "abitype";

export const useContractWrite = <
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TChainId extends number,
  TMode extends WriteContractMode = undefined,
>(
  data: UsePrepareContractWriteConfig<TAbi, TFunctionName, TChainId>,
) => {
  const [trxHash, setTrxHash] = useState<`0x${string}` | undefined>(undefined);
  const [trxLink, setTrxLink] = useState<string | undefined>(undefined);
  const [isWaiting, setIsWaiting] = useState(false);

  const { chain } = useNetwork();

  const { config, isSuccess } = usePrepareContractWrite({
    ...data,
  });

  const preparedConfig = config as unknown as UseContractWriteConfig<TAbi, TFunctionName, TMode>;

  const { writeAsync } = useWagmiWrite(preparedConfig);
  const { isSuccess: trxSuccess, isError: trxError } = useWaitForTransaction({
    hash: trxHash,
  });

  useEffect(() => {
    if (trxSuccess) {
      toast.success("Successfully minted 100 SCT");
      setIsWaiting(false);
    }

    if (trxError) {
      toast.error("Transaction error");
      setIsWaiting(false);
    }
  }, [trxSuccess, trxError]);

  const writeHandler = () => {
    if (isSuccess && writeAsync) {
      setIsWaiting(true);
      setTrxLink(undefined);
      writeAsync()
        .then(trxData => {
          setTrxHash(trxData.hash);
          setTrxLink(chain?.blockExplorers?.default.url + "/tx/" + trxData.hash);
        })
        .catch(error => {
          setIsWaiting(false);
          toast.error(error.message);
        });
    }
  };

  return { write: writeHandler, isWaiting, isSuccess, trxLink };
};
