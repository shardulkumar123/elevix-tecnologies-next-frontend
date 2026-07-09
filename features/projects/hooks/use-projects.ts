import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/api-client";

import { getProjects, saveProjects } from "@/features/admin/services/mock-data";
import { Project } from "@/features/admin/types";

export interface ProjectBackendModel {
  id: string;
  title: string;
  category: string;
  desc: string;
  longDesc: string;
  stats: string;
  techStack: string[];
  color: string;
  createdAt: string;
}

export const mapBackendToFrontendProject = (p: ProjectBackendModel): Project => ({
  id: p.id,
  title: p.title,
  category: p.category,
  desc: p.desc,
  longDesc: p.longDesc,
  stats: p.stats,
  techStack: p.techStack,
  color: p.color,
  createdAt: p.createdAt || new Date().toISOString(),
});

export const mapFrontendToBackendProject = (p: Partial<Project>) => ({
  title: p.title || "",
  category: p.category || "",
  desc: p.desc || "",
  longDesc: p.longDesc || "",
  stats: p.stats || "",
  techStack: p.techStack || [],
  color: p.color || "from-blue-500 to-indigo-500",
});

export const useProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const response = (await axiosInstance.get("/projects")) as ProjectBackendModel[];
        if (Array.isArray(response)) {
          return response.map(mapBackendToFrontendProject);
        }
        throw new Error("Invalid response format");
      } catch (err: unknown) {
        console.warn(
          "Backend /projects API is offline. Using simulated localStorage database.",
          err
        );
        return getProjects();
      }
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation<Project, Error, Partial<Project>>({
    mutationFn: async (newProject) => {
      try {
        const payload = mapFrontendToBackendProject(newProject);
        const response = (await axiosInstance.post("/projects", payload)) as ProjectBackendModel;
        return mapBackendToFrontendProject(response);
      } catch (err: unknown) {
        console.warn(
          "Backend /projects API is offline. Creating in simulated local database.",
          err
        );
        const projects = getProjects();
        const createdProject: Project = {
          id: `project-${Date.now()}`,
          title: newProject.title || "",
          category: newProject.category || "",
          desc: newProject.desc || "",
          longDesc: newProject.longDesc || "",
          stats: newProject.stats || "",
          techStack: newProject.techStack || [],
          color: newProject.color || "from-blue-500 to-indigo-500",
          createdAt: new Date().toISOString(),
        };
        saveProjects([...projects, createdProject]);
        return createdProject;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation<Project, Error, { id: string; data: Partial<Project> }>({
    mutationFn: async ({ id, data }) => {
      try {
        const payload = mapFrontendToBackendProject(data);
        const response = (await axiosInstance.patch(
          `/projects/${id}`,
          payload
        )) as ProjectBackendModel;
        return mapBackendToFrontendProject(response);
      } catch (err: unknown) {
        console.warn(
          "Backend /projects API is offline. Updating in simulated local database.",
          err
        );
        const projects = getProjects();
        const updated = projects.map((p) =>
          p.id === id
            ? {
                ...p,
                ...data,
              }
            : p
        );
        saveProjects(updated);
        return updated.find((p) => p.id === id) as Project;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      try {
        await axiosInstance.delete(`/projects/${id}`);
      } catch (err: unknown) {
        console.warn(
          "Backend /projects API is offline. Deleting from simulated local database.",
          err
        );
        const projects = getProjects();
        const updated = projects.filter((p) => p.id !== id);
        saveProjects(updated);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
