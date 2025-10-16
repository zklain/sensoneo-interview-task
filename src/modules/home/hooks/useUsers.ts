import { useQuery } from "@tanstack/react-query";
import {
  type ApiSuccessResponse,
  fetchUsers,
  type User,
  type ApiErrorResponse,
} from "../../../lib/api";

export function useUsers() {
  return useQuery<ApiSuccessResponse<User[]>, ApiErrorResponse>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}
