import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/api-client";

import { getServices, saveServices } from "@/features/admin/services/mock-data";
import { Service } from "@/features/admin/types";

export interface ServiceBackendModel {
  id: string;
  title: string;
  category: string;
  desc: string;
  icon: string;
  color: string;
  features: string[];
  technologies?: string[];
  status?: string;
  createdAt: string;
  updatedAt: string;
}

export const mapBackendToFrontendService = (s: ServiceBackendModel): Service => ({
  id: s.id,
  name: s.title,
  category: s.category || "General",
  description: s.desc,
  features: s.features || [],
  technologies: s.technologies || [],
  status: (s.status as "Active" | "Inactive") || "Active",
  createdAt: s.createdAt || new Date().toISOString(),
});

export const mapFrontendToBackendService = (s: Partial<Service>) => ({
  title: s.name,
  category: s.category || "General",
  desc: s.description,
  icon: "Cpu",
  color: "indigo",
  features: s.features || [],
  technologies: s.technologies || [],
  status: s.status || "Active",
});

interface ApiErrorType {
  message: string;
  statusCode?: number;
  error?: string;
}

const checkAndPropagateError = (err: unknown) => {
  const apiError = err as ApiErrorType;
  if (apiError && typeof apiError.statusCode === "number") {
    throw new Error(apiError.message || "Request failed");
  }
};

const CACHE_KEY = "elevix-services-cache";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const clearLocalStorageCache = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CACHE_KEY);
  }
};

export const useServices = () => {
  return useQuery<Service[], Error>({
    queryKey: ["services"],
    queryFn: async () => {
      // Check if we have a fresh cached copy in localStorage first (client-only)
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_TTL) {
              return data;
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }

      try {
        const response = (await axiosInstance.get("/services")) as ServiceBackendModel[];
        if (Array.isArray(response)) {
          const mapped = response.map(mapBackendToFrontendService);
          if (typeof window !== "undefined") {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                data: mapped,
                timestamp: Date.now(),
              })
            );
          }
          return mapped;
        }
        throw new Error("Invalid response format");
      } catch (err: unknown) {
        console.warn("Backend /services API error:", err);
        // Fallback to local storage mock services
        return getServices();
      }
    },
    staleTime: CACHE_TTL,
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation<Service, Error, Partial<Service>>({
    mutationFn: async (newServiceData) => {
      const payload = mapFrontendToBackendService(newServiceData);
      try {
        const response = (await axiosInstance.post(
          "/services",
          payload
        )) as ServiceBackendModel;
        clearLocalStorageCache();
        return mapBackendToFrontendService(response);
      } catch (err) {
        checkAndPropagateError(err);
        console.warn(
          "Backend /services API offline or failed. Creating service locally.",
          err
        );
        const currentServices = getServices();
        const created: Service = {
          id: `srv-${Date.now()}`,
          name: newServiceData.name || "",
          category: newServiceData.category || "General",
          description: newServiceData.description || "",
          features: newServiceData.features || [],
          technologies: newServiceData.technologies || [],
          status: newServiceData.status || "Active",
          createdAt: new Date().toISOString(),
        };
        saveServices([created, ...currentServices]);
        clearLocalStorageCache();
        return created;
      }
    },
    onSuccess: () => {
      clearLocalStorageCache();
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation<Service, Error, { id: string; data: Partial<Service> }>({
    mutationFn: async ({ id, data }) => {
      const payload = mapFrontendToBackendService(data);
      try {
        const response = (await axiosInstance.patch(
          `/services/${id}`,
          payload
        )) as ServiceBackendModel;
        clearLocalStorageCache();
        return mapBackendToFrontendService(response);
      } catch (err) {
        checkAndPropagateError(err);
        console.warn(
          "Backend /services API offline or failed. Updating service locally.",
          err
        );
        const currentServices = getServices();
        const updatedServices = currentServices.map((s) =>
          s.id === id ? { ...s, ...data } : s
        );
        saveServices(updatedServices);
        clearLocalStorageCache();
        const updated = updatedServices.find((s) => s.id === id)!;
        return updated;
      }
    },
    onSuccess: () => {
      clearLocalStorageCache();
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      try {
        await axiosInstance.delete(`/services/${id}`);
        clearLocalStorageCache();
      } catch (err) {
        checkAndPropagateError(err);
        console.warn(
          "Backend /services API offline or failed. Deleting service locally.",
          err
        );
        const currentServices = getServices();
        const updatedServices = currentServices.filter((s) => s.id !== id);
        saveServices(updatedServices);
        clearLocalStorageCache();
      }
    },
    onSuccess: () => {
      clearLocalStorageCache();
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};

