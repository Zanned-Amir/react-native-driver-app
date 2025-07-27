export function formatErrorsAsSingleMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    (error as any).response?.data
  ) {
    const data = (error as any).response.data;

    if (Array.isArray(data.error)) {
      return data.error.map((msg) => cleanMessage(msg)).join("\n");
    }

    if (typeof data.error === "string") {
      return cleanMessage(data.error);
    }
  }

  return "An unexpected error occurred.";
}

function cleanMessage(msg: string): string {
  return msg.trim().charAt(0).toUpperCase() + msg.trim().slice(1);
}
