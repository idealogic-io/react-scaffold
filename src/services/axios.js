import axios from "axios";

axios.defaults.baseURL = process.env.BASE_URL;

axios.interceptors.request.use(async config => {
  return config;
});
