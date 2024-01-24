import { createAsyncThunk } from "@reduxjs/toolkit";

import { isErrorResult, makeApiRequest, ENDPOINTS_AUTH } from "services";
import { ErrorResult } from "services/types";

import { LoginUserPayload, LoginUserResponse, RefreshTokenPayload, LoginUserWithWalletPayload } from "./types";

export const loginUser = createAsyncThunk<LoginUserResponse, LoginUserPayload, { rejectValue: ErrorResult }>(
  "auth/login",
  async (data, { rejectWithValue }) => {
    const result = await makeApiRequest<LoginUserResponse>({
      method: "POST",
      url: ENDPOINTS_AUTH.login,
      data,
    });

    if (isErrorResult(result)) {
      return rejectWithValue(result);
    }

    return result;
  },
);

export const loginUserWithWallet = createAsyncThunk<
  LoginUserResponse,
  LoginUserWithWalletPayload,
  { rejectValue: ErrorResult }
>("auth/wallet-login", async (data, { rejectWithValue }) => {
  const result = await makeApiRequest<LoginUserResponse>({
    method: "POST",
    url: ENDPOINTS_AUTH.walletLogin,
    data,
  });

  if (isErrorResult(result)) {
    return rejectWithValue(result);
  }

  return result;
});

export const refreshToken = createAsyncThunk<LoginUserResponse, RefreshTokenPayload, { rejectValue: ErrorResult }>(
  "auth/refresh-token",
  async (data, { rejectWithValue }) => {
    const result = await makeApiRequest<LoginUserResponse>({
      method: "POST",
      url: ENDPOINTS_AUTH.refreshToken,
      isShowError: false,
      data,
    });

    if (isErrorResult(result)) {
      return rejectWithValue(result);
    }

    return result;
  },
);
