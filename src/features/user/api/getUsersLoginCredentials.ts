import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface UserLoginCredential {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  password: string;
}

export type UserLoginCredentials = UserLoginCredential[];

export const getUsersLoginCredentials = async ({
  limit = 1,
}: { limit?: number } = {}): Promise<UserLoginCredentials> => {
  try {
    const res = await axios.get(`/v1/users?limit=${limit}`);
    return res?.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const useGetUsersLoginCredentials = ({
  limit,
}: { limit?: number } = {}) => {
  return useQuery({
    queryKey: ["usersCredentials", limit],
    queryFn: () => getUsersLoginCredentials({ limit }),
  });
};
