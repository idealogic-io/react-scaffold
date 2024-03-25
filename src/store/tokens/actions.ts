import { createAsyncThunk } from "@reduxjs/toolkit";

import { isErrorResult, makeApiRequest } from "services";
import { TokenList } from "configs/web3";

import { TokensListByChainPayload, TokensListByChainResponse } from "./types";
import { ErrorResult } from "services/types";

export const getTokensListByChain = createAsyncThunk<
  TokensListByChainResponse,
  TokensListByChainPayload,
  { rejectValue: ErrorResult }
>("tokens/getTokensByChain", async ({ urls, additionalTokens }, { rejectWithValue }) => {
  const requests = urls.map(async url => {
    return await makeApiRequest<TokensListByChainResponse>({
      method: "GET",
      url,
      isShowError: false,
    });
  });

  const responses = await Promise.all(requests);

  const failedRequests = responses.filter(response => isErrorResult(response)) as ErrorResult[];

  if (failedRequests.length) {
    return rejectWithValue(failedRequests[0]);
  }

  return [...(responses as TokenList[]).flat(), ...additionalTokens];
});
