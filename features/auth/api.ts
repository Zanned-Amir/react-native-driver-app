import apiClient, { apiClientNoInterceptors } from "@/common/api/client";

export const fetchUserProfile = async () => {
  const response = await apiClient.get("/auth/profile");
  return response.data;
};

export const fetchUserAvatar = async () => {
  const response = await apiClient.get("/auth/profile/avatar");
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post("/mobile/auth/logout");
  return response.data;
};
export const logoutUserAll = async () => {
  const response = await apiClient.post("/mobile/auth/logout-all");
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await apiClientNoInterceptors.post("/mobile/auth/login", {
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

export const verifyOtpResetPassword = async ({ token, otp }) => {
  const response = await apiClientNoInterceptors.post(
    "/auth/otp/verify-reset-password-otp",
    {
      token,
      otp,
    }
  );
  return response.data;
};

export const resetPassword = async ({ token, password, otp }) => {
  const response = await apiClientNoInterceptors.post(
    "/auth/otp/reset-password",
    {
      new_password: password,
      otp,
    },
    {
      params: { token },
    }
  );
  return response.data;
};

export const sendVerificationEmailLink = async ({ email }) => {
  const response = await apiClient.post("/auth/send-activation-email", {
    email,
  });
  return response.data;
};

export const sendVerificationEmailOtp = async ({ email }) => {
  const response = await apiClientNoInterceptors.post(
    "/auth/otp/send-activation-email",
    {
      email,
    }
  );
  return response.data;
};

export const verifyEmailOtp = async ({ otp, token }) => {
  const response = await apiClientNoInterceptors.post(
    "/auth/otp/account-activation",
    {},
    {
      params: { otp, token },
    }
  );
  return response.data;
};

export const changePassword = async ({ oldPassword, newPassword }) => {
  const response = await apiClient.post("/auth/change-password", {
    current_password: oldPassword,
    new_password: newPassword,
  });
  return response.data;
};
