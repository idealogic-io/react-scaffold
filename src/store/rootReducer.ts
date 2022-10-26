import { combineReducers } from "redux";

import modal from "store/reducers/modal";
import auth from "./reducers/auth";
import multicall from "./reducers/multicall/reducer";

export const rootReducer = combineReducers({
  [modal.name]: modal.reducer,
  [auth.name]: auth.reducer,
  multicall: multicall,
});

export default rootReducer;
