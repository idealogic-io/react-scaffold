import { TokenAddressMap, TokenList } from "configs/web3";
import { ErrorResult } from "services/types";

export type TokenState = {
  pending: boolean;
  error: ErrorResult | null;
  allTokens: TokenList;
  tokensList: TokenAddressMap | null;
};

export type TokensListByChainPayload = {
  urls: string[];
  additionalTokens: TokenList;
};

export type TokensListByChainResponse = TokenList;
