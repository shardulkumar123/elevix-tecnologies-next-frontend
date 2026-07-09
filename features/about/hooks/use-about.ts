import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/api-client";

import { getAboutInfo, saveAboutInfo } from "@/features/admin/services/mock-data";
import { About } from "@/features/admin/types";

export interface AboutBackendModel {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  missionTitle: string;
  missionPoints: string[];
  stats: { value: string; label: string }[];
  values: { title: string; desc: string; icon: string }[];
  ctaTitle: string;
  ctaDescription: string;
  createdAt?: string;
}

export const mapBackendToFrontendAbout = (a: AboutBackendModel): About => ({
  id: a.id,
  title: a.title,
  subtitle: a.subtitle,
  description: a.description,
  missionTitle: a.missionTitle,
  missionPoints: a.missionPoints || [],
  stats: a.stats || [],
  values: a.values || [],
  ctaTitle: a.ctaTitle,
  ctaDescription: a.ctaDescription,
  createdAt: a.createdAt,
});

export const mapFrontendToBackendAbout = (a: Partial<About>) => ({
  title: a.title,
  subtitle: a.subtitle,
  description: a.description,
  missionTitle: a.missionTitle,
  missionPoints: a.missionPoints,
  stats: a.stats,
  values: a.values,
  ctaTitle: a.ctaTitle,
  ctaDescription: a.ctaDescription,
});

export const useAbout = () => {
  return useQuery<About, Error>({
    queryKey: ["about"],
    queryFn: async () => {
      try {
        const response = (await axiosInstance.get("/about")) as AboutBackendModel;
        if (response && response.id) {
          return mapBackendToFrontendAbout(response);
        }
        throw new Error("Invalid response format");
      } catch (err: unknown) {
        console.warn("Backend /about API is offline. Using simulated localStorage database.", err);
        return getAboutInfo();
      }
    },
  });
};

export const useUpdateAbout = () => {
  const queryClient = useQueryClient();
  return useMutation<About, Error, Partial<About>>({
    mutationFn: async (updatedData) => {
      try {
        const payload = mapFrontendToBackendAbout(updatedData);
        const response = (await axiosInstance.patch("/about", payload)) as AboutBackendModel;
        return mapBackendToFrontendAbout(response);
      } catch (err: unknown) {
        console.warn("Backend /about API is offline. Updating in simulated local database.", err);
        const current = getAboutInfo();
        const merged: About = {
          ...current,
          ...updatedData,
          missionPoints: updatedData.missionPoints || current.missionPoints,
          stats: updatedData.stats || current.stats,
          values: updatedData.values || current.values,
        };
        saveAboutInfo(merged);
        return merged;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
    },
  });
};
