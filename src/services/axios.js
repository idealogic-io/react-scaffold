import axios from "axios";
import { logout } from "store/reducers/auth";

import store from "store/store";

export const baseUrl = process.env.REACT_APP_API_URL;

export const getInstance = (baseURL = baseUrl) => {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
  });

  instance.interceptors.request.use(config => {
    const token = store.getState().auth.token;

    if (token && config.headers) {
      config.headers.Authorization = `Authorization ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    success => success,
    error => {
      if (error.response.status === 401) {
        store.dispatch(logout());
      }
    },
  );

  return instance;
};

export const isAxiosError = e => {
  return axios.isAxiosError(e);
};
