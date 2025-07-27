type ApiErrorResponse = {
  statusCode: number;
  timestamp: string;
  path: string;
  error: string[] | string;
};

export function formatApiError(error: unknown): string | string[] {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    (error as any).response?.data
  ) {
    const data = (error as any).response.data as ApiErrorResponse;

    if (Array.isArray(data.error)) {
      // Return array if multiple errors
      return data.error.map((e: string) => cleanMessage(e));
    } else if (typeof data.error === "string") {
      return cleanMessage(data.error);
    }
  }

  // Fallback
  return "An unexpected error occurred.";
}

// Optional cleanup helper (e.g., fix capitalization, remove junk)
function cleanMessage(msg: string): string {
  return msg.trim(); // add more formatting if needed
}
