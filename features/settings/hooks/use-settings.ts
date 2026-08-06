import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/api-client";

import { getSettings, saveSettings } from "@/features/admin/services/mock-data";
import { SystemSettings } from "@/features/admin/types";

export interface SettingsBackendModel {
  id?: string;
  siteName: string;
  siteEmail: string;
  contactPhone?: string;
  address?: string;
  maintenanceMode: boolean;
  allowPublicApplications: boolean;
  maxUploadSizeMb: number;
  supportHours?: string;
  privacyPolicy?: string;
  termsOfService?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const mapBackendToFrontendSettings = (s: SettingsBackendModel): SystemSettings => ({
  siteName: s.siteName || "",
  siteEmail: s.siteEmail || "",
  contactPhone: s.contactPhone || "",
  address: s.address || "",
  maintenanceMode: Boolean(s.maintenanceMode),
  allowPublicApplications: Boolean(s.allowPublicApplications),
  maxUploadSizeMb: s.maxUploadSizeMb ?? 10,
  supportHours: s.supportHours || "",
  privacyPolicy: s.privacyPolicy || "",
  termsOfService: s.termsOfService || "",
});

export const mapFrontendToBackendSettings = (
  s: Partial<SystemSettings>
): Partial<SettingsBackendModel> => ({
  siteName: s.siteName,
  siteEmail: s.siteEmail,
  contactPhone: s.contactPhone,
  address: s.address,
  maintenanceMode: s.maintenanceMode,
  allowPublicApplications: s.allowPublicApplications,
  maxUploadSizeMb: s.maxUploadSizeMb,
  supportHours: s.supportHours,
  privacyPolicy: s.privacyPolicy,
  termsOfService: s.termsOfService,
});

export const useSettings = () => {
  return useQuery<SystemSettings, Error>({
    queryKey: ["settings"],
    queryFn: async () => {
      try {
        const response = (await axiosInstance.get("/settings")) as SettingsBackendModel;
        if (response && (response.siteName || response.siteEmail || response.id)) {
          const mapped = mapBackendToFrontendSettings(response);
          saveSettings(mapped);
          return mapped;
        }
        throw new Error("Invalid settings response");
      } catch (err) {
        console.warn("Backend /settings API unavailable or failed. Fallback to localStorage.", err);
        return getSettings();
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation<SystemSettings, Error, Partial<SystemSettings>>({
    mutationFn: async (updatedData: Partial<SystemSettings>) => {
      try {
        const payload = mapFrontendToBackendSettings(updatedData);
        const response = (await axiosInstance.patch("/settings", payload)) as SettingsBackendModel;
        if (response) {
          const mapped = mapBackendToFrontendSettings(response);
          saveSettings(mapped);
          return mapped;
        }
        throw new Error("Invalid response from server");
      } catch (err) {
        console.warn("Backend update /settings failed. Falling back to local storage update.", err);
        const current = getSettings();
        const merged = { ...current, ...updatedData };
        saveSettings(merged);
        return merged;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["settings"], data);
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};
