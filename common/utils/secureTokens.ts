import * as SecureStore from "expo-secure-store";

export async function saveTokens(
  accessToken: string,
  refreshToken: string,
  sessionId: string,
  access_token_expires_in: string,
  refresh_token_expires_in: string
) {
  await SecureStore.setItemAsync("accessToken", accessToken);
  await SecureStore.setItemAsync("refreshToken", refreshToken);
  await SecureStore.setItemAsync("sessionId", sessionId);
  await SecureStore.setItemAsync(
    "access_token_expires_in",
    access_token_expires_in
  );
  await SecureStore.setItemAsync(
    "refresh_token_expires_in",
    refresh_token_expires_in
  );

  return true;
}

export async function getTokens() {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const refreshToken = await SecureStore.getItemAsync("refreshToken");
  const sessionId = await SecureStore.getItemAsync("sessionId");
  const access_token_expires_in = await SecureStore.getItemAsync(
    "access_token_expires_in"
  );
  const refresh_token_expires_in = await SecureStore.getItemAsync(
    "refresh_token_expires_in"
  );

  return {
    accessToken,
    refreshToken,
    sessionId,
    access_token_expires_in,
    refresh_token_expires_in,
  };
}
export async function clearTokens() {
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
  await SecureStore.deleteItemAsync("sessionId");
  await SecureStore.deleteItemAsync("access_token_expires_in");
  await SecureStore.deleteItemAsync("refresh_token_expires_in");

  return true;
}

export async function getAccessToken() {
  const token = await SecureStore.getItemAsync("accessToken");

  return token;
}

export async function getRefreshToken() {
  const token = await SecureStore.getItemAsync("refreshToken");

  return token;
}

export async function getSessionId() {
  const sessionId = await SecureStore.getItemAsync("sessionId");

  return sessionId;
}
export async function getAccessTokenExpiresIn() {
  const expiresIn = await SecureStore.getItemAsync("access_token_expires_in");

  return expiresIn;
}

export async function getRefreshTokenExpiresIn() {
  const expiresIn = await SecureStore.getItemAsync("refresh_token_expires_in");

  return expiresIn;
}
