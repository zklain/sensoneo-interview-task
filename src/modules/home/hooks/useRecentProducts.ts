import { useQuery } from "@tanstack/react-query";
import {
  type ApiSuccessResponse,
  fetchProducts,
  type Product,
  type ApiErrorResponse,
} from "../../../lib/api";

export function useRecentProducts() {
  return useQuery<ApiSuccessResponse<Product[]>, ApiErrorResponse>({
    queryKey: ["recent-products"],
    queryFn: async () =>
      await fetchProducts({ limit: 5, sort: "registeredAt", order: "desc" }),
  });
}
