import { ERROR_MESSAGES, LOCAL_STORAGE_KEYS } from "@/constants";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

export const apiClient = axiosInstance;

// Request Interceptor: Attach authentication token if available
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(LOCAL_STORAGE_KEYS.token);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: standard error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    let message: string = ERROR_MESSAGES.generic;
    let validationDetails: string[] | undefined = undefined;

    if (error.response) {
      // Server responded with non-2xx code
      const data = error.response.data as { message?: string | string[] } | undefined;
      if (data?.message) {
        if (Array.isArray(data.message)) {
          validationDetails = data.message;
          message = data.message.join(". ");
        } else {
          message = data.message;
        }
      } else {
        message = error.message;
      }

      // Handle 401 Unauthorized
      if (error.response.status === 401 && typeof window !== "undefined") {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
        // Optional: window.location.href = '/login';
      }
    } else if (error.request) {
      // Request was made but no response received
      message = ERROR_MESSAGES.network;
    }

    return Promise.reject({
      message,
      statusCode: error.response?.status,
      error: error.code || "API_ERROR",
      validationDetails,
    });
  }
);
