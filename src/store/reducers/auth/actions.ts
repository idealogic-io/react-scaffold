import { createAsyncThunk } from "@reduxjs/toolkit";

import { isErrorResult, makeApiRequest, ENDPOINTS } from "services";
import { ErrorResult } from "services/types";

import { LoginUserPayload, LoginUserResponse } from "./types";

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
