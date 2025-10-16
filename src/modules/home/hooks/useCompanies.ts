import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import {
  type ApiSuccessResponse,
  fetchCompanies,
  type Company,
  type ApiErrorResponse,
} from "../../../lib/api";

export function useCompanies(
  options?: Partial<
    UseQueryOptions<ApiSuccessResponse<Company[]>, ApiErrorResponse>
  >,
) {
  return useQuery<ApiSuccessResponse<Company[]>, ApiErrorResponse>({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    ...options,
  });
}
