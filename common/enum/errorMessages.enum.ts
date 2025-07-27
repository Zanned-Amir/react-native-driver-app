export const enum ErrorMessages {
  NETWORK_ERROR = "Network error occurred. Please check your connection.",
  TIMEOUT_ERROR = "Request timed out. Please try again later.",
}

export const enum ErrorClientMessages {
  // JWT Auth Guard Messages
  TOKEN_EXPIRED = "Your session has expired. Please log in again",
  INVALID_TOKEN = "Invalid authentication token",
  TOKEN_NOT_ACTIVE = "Token is not active yet",
  TOKEN_REQUIRED = "Authentication token is required",
  AUTH_FAILED = "Authentication failed. Please provide a valid token",

  // JWT Refresh Guard Messages
  SESSION_NOT_FOUND = "Session ID not found",
  REFRESH_TOKEN_EXPIRED = "Refresh token has expired. Please log in again",
  INVALID_REFRESH_TOKEN = "Invalid refresh token format",
  REFRESH_TOKEN_NOT_ACTIVE = "Refresh token is not active yet",
  REFRESH_TOKEN_REQUIRED = "Refresh token is required",
  REFRESH_VALIDATION_FAILED = "Refresh token validation failed",
  REFRESH_TOKEN_INVALID = "Invalid or expired refresh token. Please log in again",

  // Authorization Guard Messages
  EMAIL_NOT_VERIFIED = "Please verify your email address",
  ACCOUNT_BLOCKED = "Your account has been blocked",
  ACCOUNT_DEACTIVATED = "Your account has been deactivated contact support",
  ACCOUNT_DELETED = "Your account has been deleted contact support",
  ACCOUNT_ARCHIVED = "Your account has been archived contact support",
  ACCESS_DENIED = "You do not have permission to access this resource",

  // General Messages
  ENDPOINT_BLOCKED = "Endpoint is blocked",
  UNAUTHORIZED = "Unauthorized access. Please log in again.",
  USER_NOT_FOUND = "User not found",
  MISSING_ATTRIBUTION = "Refresh token or session ID is missing",
}
