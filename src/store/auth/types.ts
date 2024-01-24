import { ErrorResult } from "services/types";

export type AuthState = {
  token: string | null;
  refreshToken: string | null;
  pending: boolean;
  error: ErrorResult | null;
};

export type LoginUserResponse = {
  accessToken: string;
  refreshToken: string;
};

export type LoginUserPayload = {
  email: string;
  password: string;
};

export type LoginUserWithWalletPayload = {
  address: string;
  hash: string;
};

export type RefreshTokenPayload = {
  refreshToken: string;
};
