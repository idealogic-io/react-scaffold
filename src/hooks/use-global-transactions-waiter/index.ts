import useSWR from "swr";
import { toast } from "react-toastify";
import { getPublicClient } from "@wagmi/core";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "store/store";
import { updateTransactions } from "store/web3-transactions";

import type { PublicClient } from "viem";
import type { AllowedChain } from "configs/chains";
import type { TransactionDetails, TransactionsState } from "store/web3-transactions/types";
import type { WaiterConfigs } from "./types";

export const useGlobalTransactionsWaiter = (configs?: WaiterConfigs) => {
  const { refreshInterval = 15_000, revalidateOnFocus = false } = configs ?? {};
  const transactionsState = useAppSelector(state => state.web3Transactions);

  const { t } = useTranslation("translation", { keyPrefix: "Transactions" });
  const dispatch = useAppDispatch();

  const { isLoading, isValidating, mutate } = useSWR(
    transactionsState && Object.keys(transactionsState).length > 0 ? [transactionsState, "/checkTransactions"] : null,
    async () => {
      return checkTransactions();
    },
    { revalidateOnFocus, refreshInterval },
  );

  const checkTransactions = async () => {
    if (!transactionsState || Object.keys(transactionsState).length === 0) return null;

    const updatedTransactionsState = {} as TransactionsState;
    const transactionsPromises: Promise<void>[] = [];

    Object.entries(transactionsState).forEach(([chainId, transactionsByChain]) => {
      const publicClient = getPublicClient({
        chainId: Number(chainId) as AllowedChain,
      });
      Object.values(transactionsByChain).forEach(transaction => {
        transactionsPromises.push(
          checkTransaction(publicClient, Number(chainId) as AllowedChain, transaction, updatedTransactionsState),
        );
      });
    });

    for (const transactionCheckPromise of transactionsPromises) {
      await transactionCheckPromise;
    }

    dispatch(updateTransactions({ updatedState: updatedTransactionsState }));
  };

  const checkTransaction = async (
    client: PublicClient,
    chainId: AllowedChain,
    transaction: TransactionDetails,
    updatedState: TransactionsState,
  ) => {
    try {
      const receipt = await client.getTransactionReceipt({ hash: transaction.hash });
      if (!receipt) {
        throw new Error();
      }

      if (receipt.status === "success") {
        toast.success(t("trxConfirmed"));
      } else {
        toast.error(t("trxFailed"));
      }
    } catch (error) {
      updatedState[chainId] = {
        ...updatedState[chainId],
        [transaction.hash]: transaction,
      };
    }
  };

  return {
    loading: isLoading || isValidating,
    refresh: mutate,
  };
};
