import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/api-client";

import { getServices } from "@/features/admin/services/mock-data";
import { Service } from "@/features/admin/types";

export interface ServiceBackendModel {
  id: string;
  title: string;
  category: string;
  desc: string;
  icon: string;
  color: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export const mapBackendToFrontendService = (s: ServiceBackendModel): Service => ({
  id: s.id,
  name: s.title,
  category: s.category,
  description: s.desc,
  features: s.features || [],
  technologies: [],
  status: "Active",
  createdAt: s.createdAt || new Date().toISOString(),
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
