import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getCategories = async (limit: number): Promise<any> => {
  try {
    const response = await axios.get(`/v1/categories?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.log("error from categories api", error);
    throw error;
  }
};

export const useGetCategories = ({ limit = 100 }: { limit: number }) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(limit),
  });
};
