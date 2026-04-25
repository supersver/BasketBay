import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const res = await axios.get(`/v1/auth/profile`);
    return res?.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });
};
