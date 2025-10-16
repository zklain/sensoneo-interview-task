import { apiClient } from "./client";
import type { ApiSuccessResponse, Company } from "./types";

export async function fetchCompanies(): Promise<ApiSuccessResponse<Company>> {
  return apiClient.get<ApiSuccessResponse<Company>>("/companies");
}
