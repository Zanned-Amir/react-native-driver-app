import { env } from "@/config/env";
import axios from "axios";
import {
  errorRequestInterceptor,
  errorResponseInterceptor,
  requestInterceptor,
  responseInterceptor,
} from "./interceptors";

const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// apply interceptors
apiClient.interceptors.request.use(requestInterceptor, errorRequestInterceptor);
apiClient.interceptors.response.use(
  responseInterceptor,
  errorResponseInterceptor
);

const apiClientNoInterceptors = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClientNoInterceptors.interceptors.request.use((config) => {
  console.log("endpoint", config.url);
  return config;
}, errorRequestInterceptor);

export default apiClient;
export { apiClientNoInterceptors };
