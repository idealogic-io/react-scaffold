import { combineReducers } from "redux";

import modal from "store/modal";
import auth from "store/auth";
import web3Transactions from "./web3-transactions";

export const rootReducer = combineReducers({
  [modal.name]: modal.reducer,
  [auth.name]: auth.reducer,
  [web3Transactions.name]: web3Transactions.reducer,
});

export default rootReducer;
