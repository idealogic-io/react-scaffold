import { combineReducers } from "redux";

import modal from "store/reducers/modal";
import auth from "./reducers/auth";
import { pokemonApi } from "./reducers/pokemon";

export const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  [modal.name]: modal.reducer,
  [auth.name]: auth.reducer,
});

export default rootReducer;
