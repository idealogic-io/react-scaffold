import { createAsyncThunk } from "@reduxjs/toolkit";

import { isErrorResult, makeApiRequest, ENDPOINTS } from "services";
import { ErrorResult } from "services/types";

import { LoginUserPayload, LoginUserResponse, RefreshTokenPayload } from "./types";

export const loginUser = createAsyncThunk<LoginUserResponse, LoginUserPayload, { rejectValue: ErrorResult }>(
  "user/login",
  async (data, { rejectWithValue }) => {
    const result = await makeApiRequest<LoginUserResponse>({
      method: "POST",
      url: ENDPOINTS.login,
      data,
    });

    if (isErrorResult(result)) {
      return rejectWithValue(result);
    }

    return result;
  },
);

export const setRefreshToken = createAsyncThunk<LoginUserResponse, RefreshTokenPayload, { rejectValue: ErrorResult }>(
  "auth/refresh-tokens",
  async (data, { rejectWithValue }) => {
    const result = await makeApiRequest<LoginUserResponse>({
      method: "POST",
      url: ENDPOINTS.refreshToken,
      isShowError: false,
      data,
    });

    if (isErrorResult(result)) {
      return rejectWithValue(result);
    }

    return result;
  },
);
