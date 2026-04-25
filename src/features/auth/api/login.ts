import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { toast } from "react-toastify";
import { API_URL } from "@/config";

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

    return res?.data;
  } catch (error: any) {
    console.error("Login error:", error);
    throw error;
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
      }
    },
    ...config,
  });
};
