import { env } from "@/config/env";
import { useAuthStore } from "@/features/auth/store";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  clearTokens,
  getRefreshToken,
  getSessionId,
  saveTokens,
} from "../utils/secureTokens";
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

export const refreshToken = async () => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token available");
  const sessionId = await getSessionId();
  if (!sessionId) throw new Error("No session ID available");

  try {
    const response = await axios.post(
      `${env.API_BASE_URL}/mobile/auth/refresh-token`,
      {
        headers: {
          "x-session-id": sessionId,
          "x-refresh-token": refreshToken,
        },
      }
    );
    if (response.data.success && response.data.data) {
      const {
        access_token,
        refresh_token,
        session_id,
        expires_in_access_token,
        expires_in_refresh_token,
      } = response.data.data;
      await saveTokens(
        access_token,
        refresh_token,
        session_id,
        expires_in_access_token,
        expires_in_refresh_token
      );
      return access_token;
    } else {
      console.error("Failed to refresh token:", response.data);
      throw new Error("Failed to refresh token");
    }
  } catch (err) {
    await clearTokens();
    throw err;
  }
};

export const handleTokenRefresh = async (error: AxiosError) => {
  const originalRequest = error.config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };
  const errorMessage = (error.response?.data as any)?.error || "";

  // Only trigger refresh for explicit token expiration
  if (
    error.response?.status === 401 &&
    !originalRequest._retry &&
    errorMessage === "Your session has expired. Please log in again"
  ) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        if (token && originalRequest.headers) {
          originalRequest.headers["authorization"] = `Bearer ${token}`;
        }
        return axios(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newAccessToken = await refreshToken();
      if (originalRequest.headers) {
        originalRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
      }
      processQueue(null, newAccessToken);
      return axios(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
      useAuthStore.getState().logout();
    }
  }

  // Any other 401: do not refresh, reject as-is
  return Promise.reject(error);
};
