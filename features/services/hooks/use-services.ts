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
  description: s.desc,
  features: s.features || [],
  technologies: [],
  status: "Active",
  createdAt: s.createdAt || new Date().toISOString(),
});

export const useServices = () => {
  return useQuery<Service[], Error>({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        const response = (await axiosInstance.get("/services")) as ServiceBackendModel[];
        if (Array.isArray(response)) {
          return response.map(mapBackendToFrontendService);
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
  });
};
