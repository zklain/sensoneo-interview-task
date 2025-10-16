import { apiClient } from "./client";
import type { ApiSuccessResponse, Product, QueryParams } from "./types";

export interface FetchProductsParams extends QueryParams {
  page?: number;
  limit?: number;
  active?: boolean;
  sort?: "name" | "registeredAt";
  order?: "asc" | "desc";
}

export async function fetchProducts(
  params?: FetchProductsParams,
): Promise<ApiSuccessResponse<Product[]>> {
  return apiClient.get<ApiSuccessResponse<Product[]>>("/products", params);
}
