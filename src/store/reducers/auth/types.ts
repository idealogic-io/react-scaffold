import { ErrorResult } from "services/types";

export type AuthState = {
  token: string | null;
  pending: boolean;
  error: ErrorResult | null;
};

export type LoginUserResponse = {
  accessToken: AuthState["token"];
};

export type LoginUserPayload = {
  email: string;
  password: string;
};
