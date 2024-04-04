import { createAction } from "@reduxjs/toolkit";
import { SerializableTransactionReceipt, TransactionType } from "./types";

export const addTransaction = createAction<{
  chainId: number;
  hash: string;
  from: string;
  approval?: { tokenAddress: string; spender: string };
  claim?: { recipient: string };
  summary?: string;
  type?: TransactionType;
}>("transactions/addTransaction");

export const clearAllTransactions = createAction<{ chainId: number }>("transactions/clearAllTransactions");

export const finalizeTransaction = createAction<{
  chainId: number;
  hash: string;
  receipt: SerializableTransactionReceipt;
}>("transactions/finalizeTransaction");

export const checkedTransaction = createAction<{
  chainId: number;
  hash: string;
  blockNumber: number;
}>("transactions/checkedTransaction");

export const resetTransactionsState = createAction("transactions/resetTransactionsState");
