import axios, { AxiosError } from "axios";

import { LOCAL_STORAGE_KEYS } from "configs";
import { ErrorResult } from "./types";
// Store
import store from "store/store";
import { setRefreshToken } from "store/reducers/auth/actions";
import { resetAuth } from "store/reducers/auth";

export const baseUrl = process.env.REACT_APP_API_URL;
let isShowError = false;

export function resetStore() {
  store.dispatch(resetAuth());
}

export function getInstance(baseURL = process.env.REACT_APP_API_URL) {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
  });

  instance.interceptors.request.use(
    config => {
      const token = store.getState().auth.token;
      const lang = localStorage.getItem(LOCAL_STORAGE_KEYS.language);

      if (token && config.headers) {
        config.headers.Authorization = `Authorization ${token}`;
        if (lang) {
          config.headers["x-lang"] = lang;
        }
      }

      return config;
    },
    error => Promise.reject(error),
  );

  instance.interceptors.response.use(
    success => success,
    error => {
      if (error?.response?.status === 401) {
        const refreshToken = store.getState().auth.refreshToken || "";

        if (!isShowError) {
          isShowError = true;

          store.dispatch(setRefreshToken({ refreshToken })).then(response => {
            if ((response.payload as ErrorResult).isError) {
              resetStore();
            }
            isShowError = false;
          });
        } else {
          resetStore();
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
}

export function isAxiosError(e: unknown): e is AxiosError {
  return axios.isAxiosError(e);
}
