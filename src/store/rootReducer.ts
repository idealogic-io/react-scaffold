import { combineReducers } from "redux";

import modal from "store/modal";
import auth from "store/auth";
import multicall from "store/multicall/reducer";
import transactions from "store/transactions/reducer";

export const rootReducer = combineReducers({
  [modal.name]: modal.reducer,
  [auth.name]: auth.reducer,
  multicall: multicall,
  transactions: transactions,
});

export default rootReducer;
