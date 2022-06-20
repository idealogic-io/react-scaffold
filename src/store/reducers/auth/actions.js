import { createAsyncThunk } from "@reduxjs/toolkit";

import { isErrorResult, makeApiRequest, ENDPOINTS } from "services";

export const loginUser = createAsyncThunk("user/login", async (data, { rejectWithValue }) => {
  const result = await makeApiRequest({
    method: "POST",
    url: ENDPOINTS.login,
    data,
  });

  if (isErrorResult(result)) {
    return rejectWithValue(result);
  }

  return result;
});
