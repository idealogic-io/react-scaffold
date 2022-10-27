import { combineReducers } from "redux";

import modal from "store/reducers/modal";
import auth from "./reducers/auth";
import multicall from "./reducers/multicall/reducer";
import transactions from "./reducers/transactions/reducer";

export const rootReducer = combineReducers({
  [modal.name]: modal.reducer,
  [auth.name]: auth.reducer,
  multicall: multicall,
  transactions: transactions,
});

export default rootReducer;
