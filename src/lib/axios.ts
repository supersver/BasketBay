import Axios, { type InternalAxiosRequestConfig, AxiosHeaders } from "axios";

import { API_URL } from "@/config";
import storage from "@/utils/storage";

function authRequestInterceptor(config: InternalAxiosRequestConfig<any>) {
  // console.log('[AXIOS] Request:', config.url);

  if (!config.headers) {
    config.headers = new AxiosHeaders();
  }

  const token = storage.getAccessToken();

  if (token) {
    config.headers.authorization = "Bearer " + `${token}`;
  }

  config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

// axios.defaults.timeout = 10000; // 10 seconds
axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      storage.removeAccessToken();
      window.location.assign(window.location.origin as unknown as string);
    } else if (status === 403) {
      // console.log('403 Forbidden received for:', error?.config?.url);
      // console.log(' Current pathname:', window.location.pathname);
      // Don't redirect if already on not-authorized page
      if (window.location.pathname !== "/not-authorized") {
        window.location.assign("/not-authorized");
      }
    } else if (status === 422) {
      storage.removeAccessToken();
      window.location.assign(window.location.origin as unknown as string);
    } else {
      console.log("API Error:", {
        url: error?.config?.url,
        method: error?.config?.method,
        status,
        response: error?.response?.data,
      });
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
