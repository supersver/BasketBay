import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { toast } from "react-toastify";
import { API_URL } from "@/config";
import storage from "@/utils/storage";

export const login = async ({
  email,
  password,
}: {
  email?: string;
  password?: string;
}): Promise<any> => {
  try {
    const res = await axios.post(`${API_URL}/v1/auth/login`, {
      email,
      password,
    });
    return res;
  } catch (error: any) {
    console.error("Login error:", error);
  }
};

export const useLogin = (config = {}) => {
  return useMutation<
    any,
    Error,
    {
      email?: string;
      password?: string;
    }
  >({
    mutationFn: login,
    onError: (error) => {
      toast.error(error?.message || "Login failed. Please try again.");
    },
    onSuccess: (data) => {
      if (data) {
        toast.success("Login successful!");
        storage.setAccessToken(data?.access_token);

        window.location.assign("/app");
      }
    },
    ...config,
  });
};
