import { useState, useEffect } from "react";
import { useSimulateContract, useWriteContract, useWaitForTransactionReceipt, useAccount, useSwitchChain } from "wagmi";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useAppDispatch } from "store/store";
import { addTransaction } from "store/web3-transactions";

import { useStopwatch } from "hooks";

import type { Config, UseSimulateContractParameters, UseSimulateContractReturnType } from "wagmi";
import type { SimulateContractData } from "@wagmi/core/query";
import type { ContractFunctionName, ContractFunctionArgs, Abi } from "viem";
import type { AllowedChain } from "configs/chains";

const WAITING_INTERVAL = 60_000;

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

  const { t } = useTranslation("translation", { keyPrefix: "Transactions" });
  const dispatch = useAppDispatch();
  const { chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { time: timeOfWaiting, isRunning: isWaiting, start: startWaiting, reset: resetWaiting } = useStopwatch();
  const { writeContractAsync } = useWriteContract();
  const { data: simulationData } = useSimulateContract({ ...parameters }) as UseSimulateContractReturnType;
  const { data: waitingData } = useWaitForTransactionReceipt({
    hash: trxHash,
    // onReplaced does not work on BSC Testnet !!!
    onReplaced: replacement => {
      const newHash = replacement.replacedTransaction.hash;
      setTrxLink(chain?.blockExplorers?.default.url + "/tx/" + newHash);
      setTrxHash(newHash);
    },
  });

  useEffect(() => {
    if (waitingData) {
      if (isWaiting) {
        if (waitingData.status === "success") {
          toast.success(t("trxConfirmed"));
        } else if (waitingData.status === "reverted") {
          toast.error(t("trxFailed"));
        }
        resetWaiting();
      } else {
        setTrxLink(undefined);
        setTrxHash(undefined);
      }
    }
  }, [waitingData]);

  useEffect(() => {
    if (isWaiting && timeOfWaiting > WAITING_INTERVAL) {
      if (parameters.chainId && trxHash) {
        const chainId = parameters.chainId as AllowedChain;
        dispatch(addTransaction({ chainId, transaction: { hash: trxHash } }));
      }
      toast.warn(t("trxTimeout"));
      setTrxHash(undefined);
      resetWaiting();
    }
  }, [timeOfWaiting]);

  const handleSend = () => {
    if (simulationData && simulationData?.request) {
      startWaiting();
      writeContractAsync({
        ...simulationData.request,
      })
        .then(hash => {
          setTrxHash(hash);
          setTrxLink(chain?.blockExplorers?.default.url + "/tx/" + hash);
        })
        .catch(err => {
          console.error(`Write method ${parameters.functionName} error:`, err);
          toast.error(t("trxError"));
          resetWaiting();
        });
    }
  };

  const writeHandler = () => {
    if (parameters.chainId && parameters.chainId !== chain?.id) {
      switchChainAsync({ chainId: parameters.chainId })
        .then(() => {
          handleSend();
        })
        .catch(err => {
          console.error(`Switch chain ${parameters.chainId} error:`, err.message);
          toast.error(err?.message);
        });
    } else {
      handleSend();
    }
  };

  return {
    write: writeHandler,
    isSuccess: Boolean(simulationData?.request),
    isWaiting,
    trxLink,
  };
};
