import useSWR from "swr";
import { toast } from "react-toastify";
import { getPublicClient } from "@wagmi/core";
import { useAppDispatch, useAppSelector } from "store/store";
import { updateTransactions } from "store/web3-transactions";

import type { PublicClient } from "viem";
import type { AllowedChain } from "configs/chains";
import type { TransactionDetails, TransactionsState } from "store/web3-transactions/types";

export type WaiterConfigs = {
  refreshInterval?: number;
  revalidateOnFocus?: boolean;
};

export const useGlobalTransactionsWaiter = (configs?: WaiterConfigs) => {
  const { refreshInterval = 15_000, revalidateOnFocus = false } = configs ?? {};
  const transactionsState = useAppSelector(state => state.web3Transactions);

  const dispatch = useAppDispatch();

  const { data, isLoading, isValidating, mutate } = useSWR(
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
        toast.success("Transaction success");
      } else {
        toast.error("Transaction failed");
      }
    } catch (error) {
      updatedState[chainId] = {
        ...updatedState[chainId],
        [transaction.hash]: transaction,
      };
    }
  };

  return {
    data,
    loading: isLoading || isValidating,
    refresh: mutate,
  };
};
