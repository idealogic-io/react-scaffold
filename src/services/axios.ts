import axios, { AxiosError } from "axios";
import { logout } from "store/reducers/auth";

import store from "store/store";

export const baseUrl = process.env.REACT_APP_API_URL as string;

export const getInstance = (baseURL: string = baseUrl) => {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
  });

  instance.interceptors.request.use(
    config => {
      const token = store.getState().auth.token;

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
      if (error?.response?.status === 401) {
        store.dispatch(logout());
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export const isAxiosError = (e: unknown): e is AxiosError => {
  return axios.isAxiosError(e);
};
