import axios, { AxiosError } from "axios";

import { ErrorResult } from "./types";

// Store
import store from "store/store";
import { refreshToken } from "store/auth/actions";
import { resetAuth } from "store/auth";

import { ENDPOINTS } from "./endpoints";
import { clearUserState } from "hooks";
import { LOCAL_STORAGE_KEYS } from "configs";
import { LoginUserResponse } from "store/auth/types";

let isRefreshing = false;
let refreshSubscribers: any[] = [];
let tokenUpdateTimestamp = 0;

const timeout = 15_000;

export function resetStore() {
  store.dispatch(resetAuth());
  clearUserState();
}

export function getInstance(baseURL = process.env.REACT_APP_API_URL) {
  const instance = axios.create({
    baseURL,
    timeout,
  });

  instance.interceptors.request.use(
    config => {
      const token = store.getState().auth.token || "";

      if (token && config.headers) {
        config.headers.Authorization = `Authorization ${token}`;
      }

      return config;
    },
    error => Promise.reject(error),
  );

  instance.interceptors.response.use(
    success => success,
    error => {
      const {
        config,
        response: { status },
      } = error;

      if (status === 401) {
        const nowTimeStamp = new Date().getTime();

        if (tokenUpdateTimestamp === 0 || nowTimeStamp - tokenUpdateTimestamp > timeout) {
          const _refreshToken = store.getState().auth.refreshToken || "";

          if (!isRefreshing) {
            isRefreshing = true;

            store.dispatch(refreshToken({ refreshToken: _refreshToken })).then(response => {
              if ((response.payload as ErrorResult).isError) {
                isRefreshing = false;
                refreshSubscribers = [];
                resetStore();
              } else {
                const { accessToken } = response.payload as LoginUserResponse;
                tokenUpdateTimestamp = new Date().getTime();

                refreshSubscribers.forEach(cb => {
                  cb(accessToken);
                });
                refreshSubscribers = [];
                isRefreshing = false;
              }
            });
          }

          if (config.url !== ENDPOINTS.refreshToken) {
            return new Promise(resolve => {
              refreshSubscribers.push((newToken: string) => {
                config.headers.Authorization = `Authorization ${newToken}`;

                resolve(axios(config));
              });
            });
          }
        } else {
          return new Promise(resolve => {
            const token = localStorage.getItem(LOCAL_STORAGE_KEYS.token);
            config.headers.Authorization = `Authorization ${token}`;

            resolve(axios(config));
          });
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
