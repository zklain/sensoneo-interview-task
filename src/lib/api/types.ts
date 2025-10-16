export type ProductPackaging = "pet" | "can" | "tetra" | "glass" | "other";

export interface Product {
  id: number;
  companyId: number;
  registeredById: number;
  name: string;
  packaging: ProductPackaging;
  deposit: number;
  volume: number;
  registeredAt: string;
  active: boolean;
}

export interface Company {
  id: number;
  name: string;
  registeredAt: string;
}

export interface User {
  id: number;
  companyId: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export interface BaseApiResponse {
  success: boolean;
}

export interface ApiErrorResponse extends BaseApiResponse {
  error: string;
}

export interface ApiSuccessResponse<T> extends BaseApiResponse {
  data: T;
  total?: number;
}

export type QueryParams = Record<string, string | number | boolean | undefined>;

export interface ApiFetchOptions {
  endpoint: string;
  options?: RequestInit;
  params?: QueryParams;
}
