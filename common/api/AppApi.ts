import { apiClientNoInterceptors } from "@/common/api/client";

export const HealthCheckApi = async () => {
  const response = await apiClientNoInterceptors.get("/health-check");
  return response.data;
};
