import { HealthCheckApi } from "@/common/api/AppApi";
import { storage } from "@/common/MMKV/storage";
import { errorHandler } from "@/common/utils/ErrorHandler";
import { saveTokens } from "@/common/utils/secureTokens";
import { useMutation, useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import {
  changePassword,
  fetchUserAvatar,
  fetchUserProfile,
  forgotPassword,
  loginUser,
  logoutUser,
  resetPassword,
  sendVerificationEmailOtp,
  verifyEmailOtp,
  verifyOtpResetPassword,
} from "./api";
import { queryKeys } from "./queries";
import { useAuthStore } from "./store";

export const useLogin = () => {
  const setAuthentication = useAuthStore((state) => state.setAuthentication);
  const setVerifiedEmail = useAuthStore((state) => state.setIsVerified);

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await loginUser({ email, password });

      const {
        access_token,
        refresh_token,
        session_id,
        expires_in_access_token,
        expires_in_refresh_token,
        email_verified,
      } = response.data;

      await saveTokens(
        access_token,
        refresh_token,
        session_id,
        expires_in_access_token,
        expires_in_refresh_token
      );

      return { email_verified };
    },

    onSuccess: ({ email_verified }) => {
      setAuthentication(true);
      setVerifiedEmail(email_verified);

      if (!email_verified) {
        Toast.show({
          type: "info",
          text1: "Email Verification Required",
          text2: "Please verify your email to access",
        });
      }
    },

    onError: (error) => {
      errorHandler({
        error,
        defaultMessage: "Failed to log in.",
        text1: "Login Failed",
        service: "Login",
      });
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();

      Toast.show({
        type: "success",
        text1: "Logged Out Successfully",
      });
    },
    onError: (error) => {
      logout();
      errorHandler({
        error,
        defaultMessage: "Failed to log out.",
        text1: "Logout Failed",
        service: "Logout",
      });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async ({
      oldPassword,
      newPassword,
    }: {
      oldPassword: string;
      newPassword: string;
    }) => {
      const res = await changePassword({
        oldPassword,
        newPassword,
      });
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Password Changed Successfully",
      });
    },
    onError: (error) => {
      errorHandler({
        error,
        defaultMessage: "Failed to change password.",
        text1: "Change Password Failed",
        service: "Change Password",
      });
    },
  });
};

export const useSendVerificationEmailOtp = () => {
  const setActivationToken = useAuthStore((state) => state.setActivationToken);

  return useMutation({
    mutationFn: sendVerificationEmailOtp,
    onSuccess: async (data) => {
      const { activation_token } = data.data;

      setActivationToken(activation_token);

      Toast.show({
        type: "success",
        text1: "Verification Email Sent",
        text2: "Please check your email for the verification code.",
      });
    },
    onError: (error) => {
      console.log(error);
      console.log("Message:", error.message);
      errorHandler({
        error,
        defaultMessage: "Failed to send verification email.",
        text1: "Email Verification Failed",
        service: "Email Verification",
      });
    },
  });
};

export const useResendVerificationEmail = () => {
  const setActivationToken = useAuthStore((state) => state.setActivationToken);

  return useMutation({
    mutationFn: sendVerificationEmailOtp,
    onSuccess: (data) => {
      const { activation_token } = data.data;

      setActivationToken(activation_token);

      Toast.show({
        type: "success",
        text1: "Verification Email Resent",
        text2: "Please check your email for the verification code.",
      });
    },
    onError: (error) => {
      errorHandler({
        error,
        defaultMessage: "Failed to resend verification email.",
        text1: "Email Resend Failed",
        service: "Email Resend",
      });
    },
  });
};

export const useVerifyEmailOtp = () => {
  const setIsVerified = useAuthStore((state) => state.setIsVerified);
  const activationToken = useAuthStore((state) => state.activationToken);

  return useMutation({
    mutationFn: async ({ otp }: { otp: string }) => {
      console.log(
        "Verifying email with OTP:",
        otp,
        "and token:",
        activationToken
      );
      const res = await verifyEmailOtp({
        token: activationToken,
        otp,
      });

      return res;
    },
    onSuccess: (data) => {
      setIsVerified(true);
      Toast.show({
        type: "success",
        text1: "Email Verified Successfully",
        text2: "You can now log in.",
      });
    },
    onError: (error) => {
      errorHandler({
        error,
        defaultMessage: "Failed to verify email.",
        text1: "Email Verification Failed",
        service: "Email Verification",
      });
    },
  });
};

export const useForgotPassword = () => {
  const setResetOtpToken = useAuthStore((state) => state.setResetOtpToken);

  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      const { expires_in, resetToken } = data.data;

      storage.set("resetToken", resetToken);
      storage.set("resetTokenExpiresIn", expires_in);

      setResetOtpToken(resetToken);

      Toast.show({
        type: "success",
        text1: "Password Reset Email Sent",
        text2: "Please check your email for instructions.",
      });
    },
    onError: (error) => {
      errorHandler({
        error,
        defaultMessage: "Failed to send password reset email.",
        text1: "Forgot Password Failed",
        service: "Forgot Password",
      });
    },
  });
};

export const useVerifyOtpResetPassword = () => {
  const setOtp = useAuthStore((state) => state.setOtp);
  const restToken = useAuthStore((state) => state.resetTokenOtp);

  return useMutation({
    mutationFn: async ({ otp }: { otp: string }) => {
      const res = await verifyOtpResetPassword({
        token: restToken,
        otp,
      });

      setOtp(otp);

      return res;
    },
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "OTP Verified",
        text2: "You can now reset your password.",
      });
    },
    onError: (error) => {
      errorHandler({
        error,
        defaultMessage: "Failed to verify OTP.",
        text1: "OTP Verification Failed",
        service: "OTP Verification",
      });
    },
  });
};

export const useResetPassword = () => {
  const resetToken = useAuthStore((state) => state.resetTokenOtp);
  const otp = useAuthStore((state) => state.otp);

  return useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      const res = await resetPassword({
        token: resetToken,
        password,
        otp,
      });

      return res;
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Password Reset Successful",
        text2: "You can now log in with your new password.",
      });
    },
    onError: (error) => {
      errorHandler({
        error,
        defaultMessage: "Failed to reset password.",
        text1: "Password Reset Failed",
        service: "Password Reset",
      });
    },
  });
};

export const useHealthCheck = () => {
  return useMutation({
    mutationFn: HealthCheckApi,
    onError: (error) => {
      errorHandler({
        error,
        defaultMessage: "Failed to check server health.",
        text1: "Health Check Failed",
        service: "Health Check",
      });
    },
  });
};

export const useProfileAvatar = () => {
  return useQuery({
    queryKey: [queryKeys.userAvatar()],
    queryFn: fetchUserAvatar,
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5,
  });
};

export const useProfile = () => {
  const setUser = useAuthStore((state) => state.updateUser);
  return useQuery({
    queryKey: [queryKeys.userProfile()],
    queryFn: async () => {
      const data = await fetchUserProfile();
      setUser(data.data);

      return data.data;
    },

    staleTime: 1000 * 60 * 5,
  });
};
