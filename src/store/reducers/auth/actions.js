import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS } from "services/endpoints";
import { isErrorResult, makeApiRequest } from "services/make-api-request";

export const loginUser = createAsyncThunk("user/login", async (data, { rejectWithValue }) => {
  const result = await makeApiRequest({
    method: "POST",
    url: ENDPOINTS.login,
    data,
  });

  if (isErrorResult(result)) {
    return rejectWithValue({ message: result.error.message });
  }

  return result;
});
