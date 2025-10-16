import { useQuery } from "@tanstack/react-query";
import {
  type ApiSuccessResponse,
  fetchProducts,
  type Product,
  type ApiErrorResponse,
} from "../../../lib/api";

export function usePendingProducts() {
  return useQuery<ApiSuccessResponse<Product[]>, ApiErrorResponse>({
    queryKey: ["pending-products"],
    queryFn: () => fetchProducts({ active: false }),
  });
}
