import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/api-client";

import { getSettings, saveSettings } from "@/features/admin/services/mock-data";
import { SystemSettings } from "@/features/admin/types";

export const useSettings = () => {
  return useQuery<SystemSettings, Error>({
    queryKey: ["settings"],
    queryFn: async () => {
      try {
        const response = (await axiosInstance.get("/settings")) as SystemSettings;
        return response;
      } catch (err: unknown) {
        console.warn(
          "Backend /settings API is offline. Using simulated localStorage database.",
          err
        );
        return getSettings();
      }
    },
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation<SystemSettings, Error, Partial<SystemSettings>>({
    mutationFn: async (updatedData) => {
      try {
        const response = (await axiosInstance.patch("/settings", updatedData)) as SystemSettings;
        return response;
      } catch (err: unknown) {
        console.warn(
          "Backend /settings API is offline. Updating in simulated local database.",
          err
        );
        const current = getSettings();
        const merged: SystemSettings = {
          ...current,
          ...updatedData,
        };
        saveSettings(merged);
        return merged;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};
