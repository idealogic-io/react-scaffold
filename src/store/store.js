import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { createLogger } from "redux-logger";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import rootReducer from "./rootReducer";

import { pokemonApi } from "store/reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    pokemonApi.middleware,

    //TODO comment next line in prod
    createLogger(),
  ],
});

setupListeners(store.dispatch);

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
