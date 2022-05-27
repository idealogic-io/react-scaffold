import { createSlice } from "@reduxjs/toolkit";

import { LOCAL_STORAGE_KEYS } from "configs";

import { loginUser } from "./actions";

const applyToken = token => {
  if (token) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.token, token);
  } else {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
  }

  return token;
};

const initialState = {
  token: null,
  error: "",
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
        console.log(action.payload);
        if (action.payload?.data?.auth_token) {
          const { auth_token } = action.payload.data;
          state.token = applyToken(auth_token);
          state.error = "";
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        if (action.payload?.message) {
          const { message } = action.payload;

          state.error = message;
          state.token = applyToken(null);
        }
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice;
