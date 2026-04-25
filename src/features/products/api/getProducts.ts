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

export type ProductQueryParams = {
  limit?: number;
  offset?: number;
  title?: string;
  categoryIds?: number[];
};

type ProductRequestParams = ProductQueryParams & {
  categoryId?: number;
};

const buildProductSearchParams = ({
  limit = 100,
  offset = 0,
  categoryId,
}: ProductRequestParams) => {
  const searchParams = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  if (typeof categoryId === "number") {
    searchParams.set("categoryId", String(categoryId));
  }

  return searchParams.toString();
};

const requestProducts = async (params: ProductRequestParams) => {
  const queryString = buildProductSearchParams(params);
  const response = await axios.get<Product[]>(`/v1/products/?${queryString}`);

  return response.data;
};

export const getProducts = async (
  params: ProductQueryParams = {},
): Promise<Product[]> => {
  try {
    const categoryIds = Array.from(
      new Set(params.categoryIds?.filter(Number.isFinite) ?? []),
    );

    if (categoryIds.length === 0) {
      return requestProducts(params);
    }

    const productGroups = await Promise.all(
      categoryIds.map((categoryId) =>
        requestProducts({ ...params, categoryId }),
      ),
    );
    const productsById = new Map<number, Product>();

    productGroups.flat().forEach((product) => {
      productsById.set(product.id, product);
    });

    return Array.from(productsById.values());
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const useGetProducts = (
  params: ProductQueryParams = {},
  config?: Omit<UseQueryOptions<Product[], Error>, "queryKey" | "queryFn">,
) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),

    ...config,
  });
};
