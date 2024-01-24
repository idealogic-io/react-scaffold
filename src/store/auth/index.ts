import { createSlice } from "@reduxjs/toolkit";

import { LOCAL_STORAGE_KEYS } from "configs";
import { loginUser, refreshToken, loginUserWithWallet } from "./actions";
import { AuthState } from "./types";

const applyToken = (key: string, token: AuthState["token"]) => {
  if (token) {
    localStorage.setItem(key, token);
  } else {
    localStorage.removeItem(key);
  }

  return token;
};

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  pending: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialState,
    token: localStorage.getItem(LOCAL_STORAGE_KEYS.token),
    refreshToken: localStorage.getItem(LOCAL_STORAGE_KEYS.refreshToken),
  },
  reducers: {
    resetAuth() {
      applyToken(LOCAL_STORAGE_KEYS.token, null);
      applyToken(LOCAL_STORAGE_KEYS.refreshToken, null);

      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      // Login user
      .addCase(loginUser.pending, state => {
        state.pending = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { accessToken, refreshToken } = action.payload;

        state.token = applyToken(LOCAL_STORAGE_KEYS.token, accessToken);
        state.refreshToken = applyToken(LOCAL_STORAGE_KEYS.refreshToken, refreshToken);
        state.error = null;
        state.pending = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
          state.token = applyToken(LOCAL_STORAGE_KEYS.token, null);
          state.refreshToken = applyToken(LOCAL_STORAGE_KEYS.refreshToken, null);
          state.pending = false;
        }
      })
      // Login user with wallet
      .addCase(loginUserWithWallet.pending, state => {
        state.pending = true;
      })
      .addCase(loginUserWithWallet.fulfilled, (state, action) => {
        const { accessToken, refreshToken } = action.payload;

        state.token = applyToken(LOCAL_STORAGE_KEYS.token, accessToken);
        state.refreshToken = applyToken(LOCAL_STORAGE_KEYS.refreshToken, refreshToken);
        state.error = null;
        state.pending = false;
      })
      .addCase(loginUserWithWallet.rejected, (state, action) => {
        // For showing purposes there will not be error path
        // But in real case you can use something like this one commented code
        // if (action.payload) {
        //   state.error = action.payload;
        //   state.token = applyToken(LOCAL_STORAGE_KEYS.token, null);
        //   state.refreshToken = applyToken(LOCAL_STORAGE_KEYS.refreshToken, null);
        //   state.pending = false;
        // }

        if (action.payload) {
          state.token = applyToken(LOCAL_STORAGE_KEYS.token, "MY_SWEET_TOKEN");
          state.refreshToken = applyToken(LOCAL_STORAGE_KEYS.refreshToken, "MY_SWEET_TOKEN_REFRESH");
          state.error = null;
          state.pending = false;
        }
      })
      // Refresh token
      .addCase(refreshToken.pending, state => {
        state.pending = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        const { accessToken, refreshToken } = action.payload;

        state.token = applyToken(LOCAL_STORAGE_KEYS.token, accessToken);
        state.refreshToken = applyToken(LOCAL_STORAGE_KEYS.refreshToken, refreshToken);
        state.error = null;
        state.pending = false;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
          state.token = applyToken(LOCAL_STORAGE_KEYS.token, null);
          state.refreshToken = applyToken(LOCAL_STORAGE_KEYS.refreshToken, null);
          state.pending = false;
        }
      });
  },
});

export const { resetAuth } = authSlice.actions;

export default authSlice;
