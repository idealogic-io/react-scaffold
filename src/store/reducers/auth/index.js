import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

import { LOCAL_STORAGE_KEYS } from "configs";

import { loginUser } from "./actions";

const applyToken = token => {
  if (token) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.token, token);
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
    axios.defaults.headers.common["Authorization"] = false;
  }

  return token;
};

const initialState = {
  token: "",
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
        if (action.payload?.token) {
          const { token } = action.payload;
          state.token = applyToken(token);
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

export default authSlice.reducer;
