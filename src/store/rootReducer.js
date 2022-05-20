import { combineReducers } from "redux";

import { pokemonApi } from "store/reducers/pokemon";
import counterSlice from "store/reducers/counter";
import modalSlice from "store/reducers/modal";
import authSlice from "store/reducers/auth";

export const rootReducer = combineReducers({
  counter: counterSlice,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  modal: modalSlice,
  auth: authSlice,
});

export default rootReducer;
