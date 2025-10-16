import type { ApiFetchOptions, QueryParams } from "./types";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

function buildQueryString(params?: QueryParams): string {
  if (!params) return "";

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  console.log("Query stringb", queryString);
  return queryString ? `?${queryString}` : "";
}

async function apiFetch<T>({
  endpoint,
  options,
  params,
}: ApiFetchOptions): Promise<T> {
  const queryString = buildQueryString(params);
  const request = await fetch(
    `${API_BASE_URL}${endpoint}${queryString}`,
    options,
  );

  if (!request.ok) {
    throw new Error(`API request failed: ${request.statusText}`);
  }

  const json = await request.json();

  // Check if the response body indicates an error
  if (json.success === false && json.error) {
    throw new Error(json.error);
  }

  return json;
}

export const apiClient = {
  get: async <T>(endpoint: string, params?: QueryParams): Promise<T> => {
    return apiFetch<T>({ endpoint, params });
  },

  post: async <T>(endpoint: string, data: unknown): Promise<T> => {
    return apiFetch<T>({
      endpoint,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    });
  },
};
