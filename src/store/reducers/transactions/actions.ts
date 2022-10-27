import { createAction } from "@reduxjs/toolkit";
import { ChainId } from "@pancakeswap/sdk";
import { SerializableTransactionReceipt, TransactionType } from "./types";

export const addTransaction = createAction<{
  chainId: ChainId;
  hash: string;
  from: string;
  approval?: { tokenAddress: string; spender: string };
  claim?: { recipient: string };
  summary?: string;
  type?: TransactionType;
}>("transactions/addTransaction");

export const clearAllTransactions = createAction<{ chainId: ChainId }>("transactions/clearAllTransactions");

export const finalizeTransaction = createAction<{
  chainId: ChainId;
  hash: string;
  receipt: SerializableTransactionReceipt;
}>("transactions/finalizeTransaction");

export const checkedTransaction = createAction<{
  chainId: ChainId;
  hash: string;
  blockNumber: number;
}>("transactions/checkedTransaction");
// TODO don't forget to add this function on logout action
export const resetTransactionsState = createAction<{ chainId: ChainId }>("transactions/resetTransactionsState");
