import { AxiosError } from "axios";

interface ApiErrorResponse {
  statusCode?: number;
  error?: string | string[];
  message?: string | string[];
  timestamp?: string;
  path?: string;
}

export function formatApiError(error: unknown): string {
  if (isAxiosError(error)) {
    // 1. Server responded with an error
    if (error.response) {
      const data = error.response.data as Partial<ApiErrorResponse>;

      const mainError = data.error || data.message;

      if (typeof mainError === "string") {
        return cleanMessage(mainError);
      }

      if (Array.isArray(mainError)) {
        return arrayToString(mainError);
      }

      return `Error ${error.response.status}: Something went wrong.`;
    }

    // 2. Request was made but no response (network error, server down)
    if (error.request) {
      return "No response from server. Please check your internet connection.";
    }

    // 3. Error setting up the request (invalid config, client-side error)
    return `Client Error: ${error.message}`;
  }

  // 4. Non-Axios errors (e.g. thrown manually)
  return "An unexpected error occurred.";
}

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError === true;
}

function cleanMessage(msg: string): string {
  const trimmed = msg.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function arrayToString(arr: string[]): string {
  return arr.map(cleanMessage).join("\n");
}
