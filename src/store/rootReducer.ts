import { combineReducers } from "redux";

import modal from "store/reducers/modal";
import auth from "./reducers/auth";

export const rootReducer = combineReducers({
  [modal.name]: modal.reducer,
  [auth.name]: auth.reducer,
});

export default rootReducer;
