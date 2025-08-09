import { mmkvStorage } from "@/common/MMKV/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { User } from "./types";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  resetTokenOtp: string | null;
  activationToken: string | null;
  otp: string | null;
  sessionId: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isVerified: boolean;
};

type AuthActions = {
  login: (
    accessToken: string,
    refreshToken: string,
    sessionId: string,
    user: any
  ) => void;
  loadUser: (user: any) => void;
  updateUser: (user: any) => void;
  loadTokens: (tokens: {
    accessToken: string;
    refreshToken: string;
    sessionId: string;
  }) => void;
  setAuthentication: (isAuthenticated: boolean) => void;
  setResetOtpToken: (resetToken: string) => void;
  setOtp: (otp: string) => void;
  setIsVerified: (isVerified: boolean) => void;
  setActivationToken: (activationToken: string) => void;
  clearTokens: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    immer((set, get) => ({
      accessToken: null,
      refreshToken: null,
      sessionId: null,
      user: null,
      isAuthenticated: false,
      isVerified: false,
      resetTokenOtp: null,
      otp: null,
      activationToken: null,
      setResetOtpToken: (resetToken: string) => {
        set((state) => {
          state.resetTokenOtp = resetToken;
        });
      },

      setActivationToken: (activationToken: string) => {
        set((state) => {
          state.activationToken = activationToken;
        });
      },

      setOtp: (otp: string) => {
        set((state) => {
          state.otp = otp;
        });
      },
      setAuthentication: (isAuthenticated: boolean) => {
        set((state) => {
          state.isAuthenticated = isAuthenticated;
        });
      },

      setIsVerified: (isVerified: boolean) => {
        set((state) => {
          state.isVerified = isVerified;
        });
      },

      login: (accessToken, refreshToken, sessionId, user) => {
        set((state) => {
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
          state.sessionId = sessionId;
          state.user = user;
          state.isAuthenticated = true;
        });
      },

      logout: () => {
        set((state) => {
          state.accessToken = null;
          state.refreshToken = null;
          state.sessionId = null;
          state.user = null;
          state.isAuthenticated = false;
          state.isVerified = false;
          state.resetTokenOtp = null;
          state.otp = null;
          state.activationToken = null;
        });
      },

      loadUser: (user) => {
        set((state) => {
          state.user = user ?? null;
        });
      },

      updateUser: (user) => {
        set((state) => {
          state.user = user;
        });
      },

      loadTokens: ({ accessToken, refreshToken, sessionId }) => {
        set((state) => {
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
          state.sessionId = sessionId;
        });
      },

      clearTokens: () => {
        set((state) => {
          state.accessToken = null;
          state.refreshToken = null;
          state.sessionId = null;
        });
      },
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        sessionId: state.sessionId,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
