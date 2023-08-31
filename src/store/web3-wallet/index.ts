import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEYS } from "configs";
import { ConnectionType } from "configs/connectors";

import { IDLE_ACTIVATION_STATE, Web3WalletState } from "./types";

const getConnectionFromLS = () => {
  const connectionInLS = localStorage.getItem(LOCAL_STORAGE_KEYS.connection);
  const connection =
    connectionInLS && connectionInLS in ConnectionType
      ? ConnectionType[connectionInLS as keyof typeof ConnectionType]
      : undefined;

  return connection;
};

const initialState: Web3WalletState = {
  connectionType: undefined,
  connectionStatus: IDLE_ACTIVATION_STATE,
};

export const web3Wallet = createSlice({
  name: "web3Wallet",
  initialState: {
    ...initialState,
    connectionType: getConnectionFromLS(),
  },
  reducers: {
    updateConnectionType: (state, action: PayloadAction<Web3WalletState["connectionType"]>) => {
      if (action.payload) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.connection, action.payload);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.connection);
      }

      state.connectionType = action.payload;
    },
    updateConnectionStatus: (state, action: PayloadAction<Web3WalletState["connectionStatus"]>) => {
      state.connectionStatus = action.payload;
    },
    resetWeb3WalletState: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.connection);

      return initialState;
    },
  },
});

export const { resetWeb3WalletState, updateConnectionType, updateConnectionStatus } = web3Wallet.actions;

export default web3Wallet;
