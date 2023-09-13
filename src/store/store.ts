import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createLogger } from "redux-logger";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false,
    });

    return process.env.NODE_ENV === "development" ? middleware.concat(createLogger()) : middleware;
  },
  devTools: process.env.NODE_ENV === "development",
});

setupListeners(store.dispatch);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
