import apiClient, { apiClientNoInterceptors } from "@/common/api/client";

export const logoutUser = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await apiClientNoInterceptors.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const forgotPassword = async ({ email }) => {
  const response = await apiClientNoInterceptors.post(
    "/auth/otp/forget-password",
    {
      email,
    }
  );
  return response.data;
};

export const verifyOtp = async ({ token, otp }) => {
  const response = await apiClientNoInterceptors.post("/verify-otp", {
    token,
    otp,
  });
  return response.data;
};

export const resetPassword = async ({ token, password, otp }) => {
  const response = await apiClientNoInterceptors.post(
    "/auth/otp/reset-password",
    {
      password,
      otp,
    },
    {
      params: { token },
    }
  );
  return response.data;
};

export const sendVerificationEmail = async ({ email }) => {
  const response = await apiClient.post("/auth/send-activation-email", {
    email,
  });
  return response.data;
};

export const verifyEmail = async ({ token }) => {
  const response = await apiClient.post("/auth/account-activation", {
    params: { token },
  });
  return response.data;
};

export const changePassword = async ({ oldPassword, newPassword }) => {
  const response = await apiClient.post("/auth/change-password", {
    oldPassword,
    newPassword,
  });
  return response.data;
};
