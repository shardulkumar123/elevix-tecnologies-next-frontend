import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/api-client";

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface LoginResponse {
  access_token?: string;
  token?: string;
  accessToken?: string;
  data?: { token?: string };
}

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async ({ email, password }) => {
      return axiosInstance.post("/auth/login", { email, password });
    },
  });
};
