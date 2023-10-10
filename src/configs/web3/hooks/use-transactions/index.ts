import { TransactionResponse } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useMemo } from "react";

import { addTransaction } from "store/transactions/actions";
import { TransactionDetails } from "store/transactions";
import { TransactionType } from "store/transactions/types";
import { useAppDispatch, useAppSelector } from "store/store";
import { newTransactionsFirst } from "./helpers";

/**
 * helper that can take a ethers library transaction response and add it to the list of transactions
 */
export function useTransactionAdder(): (
  response: TransactionResponse,
  customData?: {
    summary?: string;
    approval?: { tokenAddress: string; spender: string };
    claim?: { recipient: string };
    type?: TransactionType;
  },
) => void {
  const { chainId, account } = useWeb3React();
  const dispatch = useAppDispatch();

  return useCallback(
    (
      response: TransactionResponse,
      {
        summary,
        approval,
        claim,
        type,
      }: {
        summary?: string;
        claim?: { recipient: string };
        approval?: { tokenAddress: string; spender: string };
        type?: TransactionType;
      } = {},
    ) => {
      if (!account || !chainId) {
        return;
      }

      const { hash } = response;
      if (!hash) {
        throw Error("No transaction hash found.");
      }
      dispatch(addTransaction({ hash, from: account, chainId, approval, summary, claim, type }));
    },
    [dispatch, chainId, account],
  );
}
/**
 * @returns all the transactions for the current chain
 */
export const useAllTransactions = (): { [txHash: string]: TransactionDetails } => {
  const { chainId } = useWeb3React();

  const state = useAppSelector(s => s.transactions);

  return useMemo(() => (chainId ? state[chainId] ?? {} : {}), [chainId, state]);
};

export const useIsTransactionPending = (transactionHash?: string) => {
  const transactions = useAllTransactions();

  if (!transactionHash || !transactions[transactionHash]) {
    return false;
  }

  return !transactions[transactionHash].receipt;
};

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export const isTransactionRecent = (tx: TransactionDetails) => {
  return new Date().getTime() - tx.addedTime < 86_400_000;
};

/**
 * @param tokenAddress
 * @param spender
 * @returns whether a token has a pending approval transaction
 */
export const useHasPendingApproval = (tokenAddress: string | undefined, spender: string | undefined) => {
  const allTransactions = useAllTransactions();
  return useMemo(
    () =>
      typeof tokenAddress === "string" &&
      typeof spender === "string" &&
      Object.keys(allTransactions).some(hash => {
        const tx = allTransactions[hash];
        if (!tx) {
          return false;
        }
        if (tx.receipt) {
          return false;
        }
        const { approval } = tx;
        if (!approval) {
          return false;
        }
        return approval.spender === spender && approval.tokenAddress === tokenAddress && isTransactionRecent(tx);
      }),
    [allTransactions, spender, tokenAddress],
  );
};

/**
 * calculate pending transactions
 */
export function usePendingTransactions(): { hasPendingTransactions: boolean; pendingNumber: number } {
  const allTransactions = useAllTransactions();
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);

  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash);
  const hasPendingTransactions = !!pending.length;

  return {
    hasPendingTransactions,
    pendingNumber: pending.length,
  };
}
