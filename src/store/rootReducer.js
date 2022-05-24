import { combineReducers } from "redux";

import { authSlice, modalSlice, pokemonApi } from "store/reducers";

export const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  modal: modalSlice,
  auth: authSlice,
});

export default rootReducer;
