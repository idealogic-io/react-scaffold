import { useState, useEffect } from "react";
import { useSimulateContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";

import type { Config, UseSimulateContractParameters, UseSimulateContractReturnType } from "wagmi";
import type { SimulateContractData } from "@wagmi/core/query";
import type { ContractFunctionName, ContractFunctionArgs, Abi } from "viem";

export const useContractWrite = <
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
  args extends ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>,
  config extends Config,
  chainId extends config["chains"][number]["id"] | undefined,
  selectData = SimulateContractData<abi, functionName, args, config, chainId>,
>(
  parameters: UseSimulateContractParameters<abi, functionName, args, config, chainId, selectData>,
) => {
  const [trxLink, setTrxLink] = useState<string | undefined>(undefined);
  const [trxHash, setTrxHash] = useState<`0x${string}` | undefined>(undefined);
  const [isWaiting, setIsWaiting] = useState(false);

  const { chain } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { data: simulationData } = useSimulateContract({ ...parameters }) as UseSimulateContractReturnType;
  const { data: waitingData } = useWaitForTransactionReceipt({
    hash: trxHash,
    onReplaced: replacement => {
      const newHash = replacement.replacedTransaction.hash;
      setTrxLink(chain?.blockExplorers?.default.url + "/tx/" + newHash);
      setTrxHash(newHash);
    },
  });

  useEffect(() => {
    if (waitingData && waitingData.status === "success") {
      setIsWaiting(false);
    }
  }, [waitingData]);

  const writeHandler = () => {
    if (simulationData && simulationData?.request) {
      setIsWaiting(true);
      writeContractAsync({
        ...simulationData.request,
      })
        .then(hash => {
          setTrxHash(hash);
          setTrxLink(chain?.blockExplorers?.default.url + "/tx/" + hash);
        })
        .catch(err => {
          console.error(`Write method ${parameters.functionName} error:`, err);
          setIsWaiting(false);
        });
    }
  };

  return {
    write: writeHandler,
    isSuccess: Boolean(simulationData?.request),
    isWaiting,
    trxLink,
  };
};
