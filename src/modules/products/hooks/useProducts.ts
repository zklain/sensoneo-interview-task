import { useQuery } from "@tanstack/react-query";
import {
  type ApiSuccessResponse,
  fetchProducts,
  type Product,
  type ApiErrorResponse,
} from "../../../lib/api";

export function useProducts() {
  return useQuery<ApiSuccessResponse<Product[]>, ApiErrorResponse>({
    queryKey: ["products"],
    queryFn: () => fetchProducts({}),
  });
}
