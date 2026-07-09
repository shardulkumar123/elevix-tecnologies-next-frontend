import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/api-client";

import { getIndustries, saveIndustries } from "@/features/admin/services/mock-data";
import { Industry } from "@/features/admin/types";

export interface ServicesDomainBackendModel {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  status: "Active" | "Inactive";
  tagline?: string;
  color?: string;
  stats?: { value: string; label: string };
  solutions: string[];
  desc?: string;
  createdAt: string;
}

export const mapBackendToFrontendIndustry = (s: ServicesDomainBackendModel): Industry => ({
  id: s.id,
  name: s.name,
  slug: s.slug || s.id,
  description: s.description || s.desc || "",
  desc: s.desc || s.description || "",
  icon: s.icon,
  status: s.status || "Active",
  createdAt: s.createdAt || new Date().toISOString(),
  tagline: s.tagline || "",
  color: s.color || "from-indigo-600 to-cyan-500",
  stats: s.stats,
  solutions: s.solutions || [],
});

export const mapFrontendToBackendIndustry = (ind: Partial<Industry>) => ({
  id: ind.id || ind.slug || `ind-${Date.now()}`,
  name: ind.name || "",
  slug: ind.slug || ind.id || `ind-${Date.now()}`,
  description: ind.description || ind.desc || "",
  icon: ind.icon || "Globe",
  status: ind.status || "Active",
  tagline: ind.tagline || "",
  color: ind.color || "from-indigo-600 to-cyan-500",
  stats: ind.stats,
  solutions: ind.solutions || [],
  desc: ind.desc || ind.description || "",
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

export const useIndustries = () => {
  return useQuery<Industry[], Error>({
    queryKey: ["industries"],
    queryFn: async () => {
      try {
        const response = (await axiosInstance.get(
          "/services-domain"
        )) as ServicesDomainBackendModel[];
        if (Array.isArray(response)) {
          return response.map(mapBackendToFrontendIndustry);
        }
        throw new Error("Invalid response format");
      } catch (err: unknown) {
        checkAndPropagateError(err);
        console.warn(
          "Backend /services-domain API is offline. Using simulated localStorage database.",
          err
        );
        return getIndustries();
      }
    },
  });
};

export const useCreateIndustry = () => {
  const queryClient = useQueryClient();
  return useMutation<Industry, Error, Partial<Industry>>({
    mutationFn: async (newIndustry) => {
      try {
        const payload = mapFrontendToBackendIndustry(newIndustry);
        const response = (await axiosInstance.post(
          "/services-domain",
          payload
        )) as ServicesDomainBackendModel;
        return mapBackendToFrontendIndustry(response);
      } catch (err: unknown) {
        checkAndPropagateError(err);
        console.warn(
          "Backend /services-domain API is offline. Creating in simulated local database.",
          err
        );
        const industries = getIndustries();
        const createdIndustry: Industry = {
          id: newIndustry.id || `ind-${Date.now()}`,
          name: newIndustry.name || "",
          slug: newIndustry.slug || "",
          description: newIndustry.description || "",
          icon: newIndustry.icon || "Globe",
          status: newIndustry.status || "Active",
          createdAt: new Date().toISOString(),
          tagline: newIndustry.tagline,
          color: newIndustry.color,
          stats: newIndustry.stats,
          solutions: newIndustry.solutions,
        };
        saveIndustries([...industries, createdIndustry]);
        return createdIndustry;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["industries"] });
    },
  });
};

export const useUpdateIndustry = () => {
  const queryClient = useQueryClient();
  return useMutation<Industry, Error, { id: string; data: Partial<Industry> }>({
    mutationFn: async ({ id, data }) => {
      try {
        const payload = mapFrontendToBackendIndustry(data);
        const response = (await axiosInstance.patch(
          `/services-domain/${id}`,
          payload
        )) as ServicesDomainBackendModel;
        return mapBackendToFrontendIndustry(response);
      } catch (err: unknown) {
        checkAndPropagateError(err);
        console.warn(
          "Backend /services-domain API is offline. Updating in simulated local database.",
          err
        );
        const industries = getIndustries();
        const updated = industries.map((ind) =>
          ind.id === id
            ? {
                ...ind,
                ...data,
              }
            : ind
        );
        saveIndustries(updated);
        return updated.find((ind) => ind.id === id) as Industry;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["industries"] });
    },
  });
};

export const useDeleteIndustry = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      try {
        await axiosInstance.delete(`/services-domain/${id}`);
      } catch (err: unknown) {
        checkAndPropagateError(err);
        console.warn(
          "Backend /services-domain API is offline. Deleting from simulated local database.",
          err
        );
        const industries = getIndustries();
        const updated = industries.filter((ind) => ind.id !== id);
        saveIndustries(updated);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["industries"] });
    },
  });
};
