import { apiClient } from "./client";
import type {
  ApiSuccessResponse,
  Product,
  ProductPackaging,
  QueryParams,
} from "./types";

export interface FetchProductsParams extends QueryParams {
  page?: number;
  limit?: number;
  active?: boolean;
  sort?: "name" | "registeredAt";
  order?: "asc" | "desc";
}

export interface CreateProductData {
  name: string;
  packaging: ProductPackaging;
  deposit: number;
  volume: number;
  companyId: number;
  registeredById: number;
}

export async function fetchProducts(
  params?: FetchProductsParams,
): Promise<ApiSuccessResponse<Product[]>> {
  return apiClient.get<ApiSuccessResponse<Product[]>>("/products", params);
}

export async function createProduct(
  data: CreateProductData,
): Promise<ApiSuccessResponse<Product>> {
  return apiClient.post<ApiSuccessResponse<Product>>("/products", data);
}
