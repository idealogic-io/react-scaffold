import { combineReducers } from "redux";

import modal from "store/modal";
import auth from "store/auth";
import multicall from "store/multicall";
import transactions from "store/transactions";
import web3Wallet from "store/web3-wallet";

export const rootReducer = combineReducers({
  [modal.name]: modal.reducer,
  [auth.name]: auth.reducer,
  [web3Wallet.name]: web3Wallet.reducer,
  multicall: multicall,
  transactions: transactions,
});

export default rootReducer;
