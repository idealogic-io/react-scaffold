import useSWR from "swr";
import { toast } from "react-toastify";
import { waitForTransaction } from "@wagmi/core";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "store/store";
import { addTransaction } from "store/web3-transactions";

import type { AllowedChain } from "configs/chains";
import type { UseContractWriteWaitData, UseContractWriteWaitConfigs } from "./types";

const WAITING_INTERVAL = 60_000;

export const useContractWriteWait = (data: UseContractWriteWaitData, configs: UseContractWriteWaitConfigs) => {
  const { hash, chainId, contractAddress, methodName } = data ?? {};
  const {
    loaderController,
    hashUpdate,
    updateCallback,
    successCallback,
    errorCallback,
    waitMode = "wait-timeout",
  } = configs ?? {};

  const { t } = useTranslation("translation", { keyPrefix: "Transactions" });
  const dispatch = useAppDispatch();

  useSWR(hash && chainId ? [hash, chainId, "/waitTransaction"] : null, async () => {
    return waitTransaction();
  });

  const localWaitingFinish = () => {
    if (updateCallback) {
      updateCallback();
    }
    loaderController(false);
    hashUpdate(undefined);
  };

  const handleTimeout = () => {
    switch (waitMode) {
      case "wait-timeout":
        return WAITING_INTERVAL;
      case "wait":
        return 0;
      default:
        return 1;
    }
  };

  const waitTransaction = async () => {
    if (hash && chainId && waitMode !== "no-wait") {
      try {
        const receipt = await waitForTransaction({
          hash,
          chainId,
          timeout: handleTimeout(),
          onReplaced: transaction => {
            hashUpdate(transaction.replacedTransaction.hash);
          },
        });
        if (!receipt) {
          throw new Error();
        } else if (receipt.status === "success") {
          if (successCallback) {
            successCallback();
          } else {
            toast.success(t("trxConfirmed"));
          }
        } else {
          if (errorCallback) {
            errorCallback();
          } else {
            toast.error(t("trxFailed"));
          }
        }
      } catch (error) {
        toast.warn(t("trxTimeout"));
        dispatch(
          addTransaction({
            chainId: chainId as AllowedChain,
            transaction: { hash, startTimestamp: Date.now(), configs: { chainId, contractAddress, methodName } },
          }),
        );
      }
    }

    localWaitingFinish();
  };
};
