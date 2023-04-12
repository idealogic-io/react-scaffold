import { combineReducers } from "redux";

import modal from "store/modal";
import auth from "./auth";

export const rootReducer = combineReducers({
  [modal.name]: modal.reducer,
  [auth.name]: auth.reducer,
});

export default rootReducer;
