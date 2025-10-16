import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import {
  type ApiSuccessResponse,
  fetchUsers,
  type User,
  type ApiErrorResponse,
} from "../../../lib/api";

export function useUsers(
  options?: Partial<
    UseQueryOptions<ApiSuccessResponse<User[]>, ApiErrorResponse>
  >,
) {
  return useQuery<ApiSuccessResponse<User[]>, ApiErrorResponse>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    ...options,
  });
}
