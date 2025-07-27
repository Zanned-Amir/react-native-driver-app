import axios from "axios";
import {
  errorRequestInterceptor,
  errorResponseInterceptor,
  requestInterceptor,
  responseInterceptor,
} from "./interceptors";

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// apply interceptors
apiClient.interceptors.request.use(requestInterceptor, errorRequestInterceptor);
apiClient.interceptors.response.use(
  responseInterceptor,
  errorResponseInterceptor
);

const apiClientNoInterceptors = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
export { apiClientNoInterceptors };
