import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getAccessToken, getSessionId } from "../utils/secureTokens";
import { handleTokenRefresh } from "./refreshTokenHandler";

const requestInterceptor = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const accessToken = await getAccessToken();
  const sessionId = await getSessionId();
  console.log("endpoint", config.url);
  if (accessToken) {
    config.headers["authorization"] = `Bearer ${accessToken}`;
  }

  if (sessionId) {
    config.headers["x-session-id"] = sessionId;
  }

  return config;
};

const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

const errorRequestInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

const errorResponseInterceptor = async (error: AxiosError) => {
  try {
    const result = await handleTokenRefresh(error);
    console.log("Retried request after token refresh");
    return result;
  } catch (err) {
    console.error("Error in response interceptor:", err);

    return Promise.reject(err);
  }
};

export {
  errorRequestInterceptor,
  errorResponseInterceptor,
  requestInterceptor,
  responseInterceptor,
};
