import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/api-client";

import { getStaff, saveStaff } from "@/features/admin/services/mock-data";
import { StaffMember } from "@/features/admin/types";

interface UserBackendModel {
  id: string;
  email: string;
  name: string | null;
  role: "ADMIN" | "EDITOR";
  createdAt: string;
}

export const mapBackendToFrontendStaff = (u: UserBackendModel): StaffMember => ({
  id: u.id,
  name: u.name || u.email.split("@")[0],
  email: u.email,
  role: u.role === "ADMIN" ? "Admin" : "Editor",
  status: "Active",
  joinedDate: u.createdAt ? u.createdAt.split("T")[0] : new Date().toISOString().split("T")[0],
});

export const mapFrontendToBackendUser = (s: Partial<StaffMember>) => ({
  email: s.email,
  name: s.name,
  role: s.role === "Admin" ? "ADMIN" : "EDITOR",
  // Provide a default password for new administrative accounts created via Roster
  password: "tempPassword123!", 
});

export const useStaff = () => {
  return useQuery<StaffMember[], Error>({
    queryKey: ["staff"],
    queryFn: async () => {
      try {
        const response = (await axiosInstance.get("/users")) as UserBackendModel[];
        if (Array.isArray(response)) {
          return response.map(mapBackendToFrontendStaff);
        }
        throw new Error("Invalid response format");
      } catch (err: unknown) {
        console.warn(
          "Backend /users API is offline. Using simulated localStorage database.",
          err
        );
        return getStaff();
      }
    },
  });
};

export const useCreateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation<StaffMember, Error, Partial<StaffMember>>({
    mutationFn: async (newStaff) => {
      try {
        const payload = mapFrontendToBackendUser(newStaff);
        const response = (await axiosInstance.post("/users", payload)) as UserBackendModel;
        return mapBackendToFrontendStaff(response);
      } catch (err: unknown) {
        console.warn(
          "Backend /users API is offline. Saving in simulated local database.",
          err
        );
        const staffList = getStaff();
        const created: StaffMember = {
          id: `staff-${Date.now()}`,
          name: newStaff.name || "",
          email: newStaff.email || "",
          role: newStaff.role || "Editor",
          status: newStaff.status || "Active",
          joinedDate: new Date().toISOString().split("T")[0],
        };
        saveStaff([...staffList, created]);
        return created;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
  });
};

export const useUpdateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation<StaffMember, Error, { id: string; data: Partial<StaffMember> }>({
    mutationFn: async ({ id, data }) => {
      try {
        const payload = {
          name: data.name,
          email: data.email,
          role: data.role ? (data.role === "Admin" ? "ADMIN" : "EDITOR") : undefined,
        };
        const response = (await axiosInstance.patch(`/users/${id}`, payload)) as UserBackendModel;
        return mapBackendToFrontendStaff(response);
      } catch (err: unknown) {
        console.warn(
          "Backend /users API is offline. Updating in simulated local database.",
          err
        );
        const staffList = getStaff();
        const updated = staffList.map((m) =>
          m.id === id ? { ...m, ...data } : m
        );
        saveStaff(updated);
        return updated.find((m) => m.id === id) as StaffMember;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
  });
};

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      try {
        await axiosInstance.delete(`/users/${id}`);
      } catch (err: unknown) {
        console.warn(
          "Backend /users API is offline. Deleting from simulated local database.",
          err
        );
        const staffList = getStaff();
        saveStaff(staffList.filter((m) => m.id !== id));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
  });
};
