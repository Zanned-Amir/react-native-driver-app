import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { formatApiError } from "./formatApiError";

export const errorHandler = ({
  error,
  defaultMessage = "An unexpected error occurred.",
  text1 = "Error",
  service = "Service",
}) => {
  if (error instanceof AxiosError) {
    const errorMessage = formatApiError(error);
    console.log(`Error from ${service}:`, errorMessage);
    Toast.show({
      type: "error",
      text1,
      text2: errorMessage,
    });
  } else {
    Toast.show({
      type: "error",
      text1,
      text2: defaultMessage,
    });
  }
};
