import { apiClient } from "./client";
import type { ApiSuccessResponse, User } from "./types";

export async function fetchUsers(): Promise<ApiSuccessResponse<User[]>> {
  return apiClient.get<ApiSuccessResponse<User[]>>("/users");
}
