import { createAsyncThunk } from "@reduxjs/toolkit";

import { makeApiRequest } from "services/make-api-request";

export const getPokemon = createAsyncThunk("counter/pokemon", async name => {
  const result = await makeApiRequest({
    baseURL: "https://pokeapi.co/api/v2/",
    method: "GET",
    url: `pokemon/${name}`,
  });

  // Comment use error handler

  // if (isErrorResult(result)) {
  // 	if (result.code !== 400) {
  // 		return rejectWithValue({ message: result.message });
  // 	} else {
  // 		return 'G_AUTH_REQUIRED' as const;
  // 	}
  // }

  return result.data;
});
