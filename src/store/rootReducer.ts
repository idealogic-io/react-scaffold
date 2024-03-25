import { combineReducers } from "redux";

import modal from "store/modal";
import auth from "store/auth";
import multicall from "store/multicall";
import transactions from "store/transactions";
import web3Wallet from "store/web3-wallet";
import tokensSlice from "./tokens";

export const rootReducer = combineReducers({
  [modal.name]: modal.reducer,
  [auth.name]: auth.reducer,
  [web3Wallet.name]: web3Wallet.reducer,
  [tokensSlice.name]: tokensSlice.reducer,

  multicall: multicall,
  transactions: transactions,
});

export default rootReducer;
