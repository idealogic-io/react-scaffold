import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { AllowedChain } from "configs/chains";
import type { TransactionsState, TransactionDetails } from "./types";

export const initialState: TransactionsState = {};

export const web3TransactionsSlice = createSlice({
  name: "web3Transactions",
  initialState: {
    ...initialState,
  },
  reducers: {
    addTransaction: (state, action: PayloadAction<{ chainId: AllowedChain; transaction: TransactionDetails }>) => {
      const { chainId, transaction } = action.payload;
      if (!state[chainId]) {
        state[chainId] = {};
      }
      if (!state[chainId]?.[transaction.hash]) {
        state[chainId]![transaction.hash] = transaction;
      }
    },
    updateTransactions: (state, action: PayloadAction<{ updatedState: TransactionsState }>) => {
      return action.payload.updatedState;
    },
    resetTransactionsState: () => {
      return initialState;
    },
  },
});

export const { addTransaction, updateTransactions, resetTransactionsState } = web3TransactionsSlice.actions;

export default web3TransactionsSlice;
