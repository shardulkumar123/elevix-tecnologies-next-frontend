import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/api-client";

import { getQueries, saveQueries } from "@/features/admin/services/mock-data";
import { ContactQuery } from "@/features/admin/types";

export interface ContactQueryPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  subject?: string;
  message: string;
}

export interface ContactQueryBackendModel {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  subject?: string;
  message: string;
  createdAt?: string;
}

// Map NestJS ContactQuery schema to frontend ContactQuery schema
export const mapBackendToFrontendQuery = (q: ContactQueryBackendModel): ContactQuery => ({
  id: q.id,
  name: q.name,
  email: q.email,
  phone: q.phone || "",
  company: q.company || "",
  serviceInterest: q.projectType || q.subject || "General Inquiry",
  message: q.message,
  status: "New", // Default status on backend
  createdAt: q.createdAt || new Date().toISOString(),
});

export const useContactQueries = () => {
  return useQuery<ContactQuery[], Error>({
    queryKey: ["contact-queries"],
    queryFn: async () => {
      try {
        const response = (await axiosInstance.get("/contact-us")) as ContactQueryBackendModel[];
        if (Array.isArray(response)) {
          return response.map(mapBackendToFrontendQuery);
        }
        throw new Error("Invalid response format");
      } catch (err: unknown) {
        console.warn(
          "Backend /contact-us API is offline. Using simulated localStorage database.",
          err
        );
        return getQueries();
      }
    },
  });
};

export const useCreateContactQuery = () => {
  const queryClient = useQueryClient();
  return useMutation<ContactQuery, Error, ContactQueryPayload>({
    mutationFn: async (payload) => {
      try {
        const response = (await axiosInstance.post(
          "/contact-us",
          payload
        )) as ContactQueryBackendModel;
        return mapBackendToFrontendQuery(response);
      } catch (err: unknown) {
        console.warn(
          "Backend /contact-us API is offline. Saving in simulated local database.",
          err
        );

        // Fallback: update localStorage
        const queries = getQueries();
        const createdQuery: ContactQuery = {
          id: `query-${Date.now()}`,
          name: payload.name,
          email: payload.email,
          phone: payload.phone || "",
          company: payload.company || "",
          serviceInterest: payload.projectType || payload.subject || "General Inquiry",
          message: payload.message,
          status: "New",
          createdAt: new Date().toISOString(),
        };
        saveQueries([createdQuery, ...queries]);
        return createdQuery;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-queries"] });
    },
  });
};
