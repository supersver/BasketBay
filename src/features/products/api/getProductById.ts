import { axios } from "@/lib/axios";
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

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get<Product>(`/v1/products/${id}`);
    return response as unknown as Product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const useGetProductById = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });
};
