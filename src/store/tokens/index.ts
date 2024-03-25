import { createSlice } from "@reduxjs/toolkit";

import { getTokensListByChain } from "./actions";
import { TokenState } from "./types";
import { tokensToChainMap } from "configs/web3";

const initialState: TokenState = {
  pending: false,
  error: null,
  allTokens: [],
  tokensList: null,
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    resetTokensSlice: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTokensListByChain.fulfilled, (state, action) => {
        state.error = null;
        state.pending = false;
        state.allTokens = action.payload;
        state.tokensList = tokensToChainMap(action.payload);
      })
      .addCase(getTokensListByChain.pending, state => {
        state.pending = true;
      })
      .addCase(getTokensListByChain.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
          state.pending = false;
        }
      });
  },
});

export const { resetTokensSlice } = tokenSlice.actions;

export default tokenSlice;
