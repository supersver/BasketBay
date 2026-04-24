import { axios } from "@/lib/axios";
import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const getProducts = async (
  limit: number = 100,
  offset: number = 0,
): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(
      `/v1/products?limit=${limit}&offset=${offset}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const useGetProducts = (
  limit: number = 100,
  offset: number = 0,
  config?: Omit<
    UseQueryOptions<Product[], Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", limit, offset],
    queryFn: () => getProducts(limit, offset),
    ...config,
  });
};
