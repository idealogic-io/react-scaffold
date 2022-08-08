import { createSlice } from "@reduxjs/toolkit";

import { LOCAL_STORAGE_KEYS } from "configs";
import { loginUser } from "./actions";
import { AuthState } from "./types";

const applyToken = (token: AuthState["token"]) => {
  if (token) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.token, token);
  } else {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
  }

  return token;
};

const initialState: AuthState = {
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialState,
    token: localStorage.getItem(LOCAL_STORAGE_KEYS.token),
  },
  reducers: {
    logout() {
      applyToken(null);

      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { accessToken } = action.payload;

        state.token = applyToken(accessToken);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        if (action.payload?.isError) {
          const { message } = action.payload;

          state.error = message;
          state.token = applyToken(null);
        }
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice;
