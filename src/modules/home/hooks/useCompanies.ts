import { useQuery } from "@tanstack/react-query";
import {
  type ApiSuccessResponse,
  fetchCompanies,
  type Company,
  type ApiErrorResponse,
} from "../../../lib/api";

export function useCompanies() {
  return useQuery<ApiSuccessResponse<Company[]>, ApiErrorResponse>({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });
}
