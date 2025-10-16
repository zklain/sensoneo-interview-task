import { useQuery } from "@tanstack/react-query";
import {
  type ApiSuccessResponse,
  fetchProducts,
  type Product,
  type ApiErrorResponse,
} from "../../../lib/api";

export function useActiveProducts() {
  return useQuery<ApiSuccessResponse<Product[]>, ApiErrorResponse>({
    queryKey: ["active-products"],
    queryFn: () => fetchProducts({ active: true }),
  });
}
