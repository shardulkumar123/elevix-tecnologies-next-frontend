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
  description: s.desc,
  features: s.features || [],
  technologies: s.technologies || [],
  status: (s.status as Service["status"]) || "Active",
  createdAt: s.createdAt || new Date().toISOString(),
});

export const mapFrontendToBackendService = (s: Partial<Service>) => ({
  title: s.name,
  desc: s.description,
  features: s.features || [],
  technologies: s.technologies || [],
  status: s.status || "Active",
  category: "General",
  icon: "Cpu",
  color: "from-blue-500 to-indigo-500",
});

const CACHE_KEY = "elevix-services-cache";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

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
        console.warn(
          "Backend /services API is offline. Using simulated localStorage database.",
          err
        );
        return getServices();
      }
    },
    staleTime: CACHE_TTL,
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation<Service, Error, Partial<Service>>({
    mutationFn: async (newService) => {
      try {
        const payload = mapFrontendToBackendService(newService);
        const response = (await axiosInstance.post("/services", payload)) as ServiceBackendModel;
        return mapBackendToFrontendService(response);
      } catch (err: unknown) {
        console.warn("Backend /services API is offline. Creating in simulated local database.", err);
        const services = getServices();
        const created: Service = {
          id: `srv-${Date.now()}`,
          name: newService.name || "",
          description: newService.description || "",
          features: newService.features || [],
          technologies: newService.technologies || [],
          status: newService.status || "Active",
          createdAt: new Date().toISOString(),
        };
        saveServices([...services, created]);
        return created;
      }
    },
    onSuccess: () => {
      if (typeof window !== "undefined") localStorage.removeItem(CACHE_KEY);
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation<Service, Error, { id: string; data: Partial<Service> }>({
    mutationFn: async ({ id, data }) => {
      try {
        const payload = mapFrontendToBackendService(data);
        const response = (await axiosInstance.patch(`/services/${id}`, payload)) as ServiceBackendModel;
        return mapBackendToFrontendService(response);
      } catch (err: unknown) {
        console.warn("Backend /services API is offline. Updating in simulated local database.", err);
        const services = getServices();
        const updated = services.map((srv) =>
          srv.id === id ? { ...srv, ...data } : srv
        );
        saveServices(updated);
        return updated.find((srv) => srv.id === id) as Service;
      }
    },
    onSuccess: () => {
      if (typeof window !== "undefined") localStorage.removeItem(CACHE_KEY);
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
      } catch (err: unknown) {
        console.warn("Backend /services API is offline. Deleting from simulated local database.", err);
        const services = getServices();
        saveServices(services.filter((srv) => srv.id !== id));
      }
    },
    onSuccess: () => {
      if (typeof window !== "undefined") localStorage.removeItem(CACHE_KEY);
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};

