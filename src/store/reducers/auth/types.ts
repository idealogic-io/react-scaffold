export type AuthState = {
  token: string | null;
  error: string | null;
};

export type LoginUserResponse = {
  auth_token: AuthState["token"];
};

export type LoginUserPayload = {
  email: string;
  password: string;
};
