import { useQuery } from "@tanstack/react-query";
import {
  type ApiSuccessResponse,
  fetchProducts,
  type Product,
  type ApiErrorResponse,
  type FetchProductsParams,
} from "../../../lib/api";

export function useProducts(params?: FetchProductsParams) {
  return useQuery<ApiSuccessResponse<Product[]>, ApiErrorResponse>({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
  });
}
