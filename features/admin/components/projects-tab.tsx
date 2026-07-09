"use client";

import React, { useState } from "react";

import { Edit, Plus, Search, Trash2, X } from "lucide-react";

import {
  useCreateProject,
  useDeleteProject,
  useProjects,
  useUpdateProject,
} from "@/features/projects/hooks/use-projects";

import { Project } from "../types";

const CATEGORIES = ["All", "Web Apps", "AI/ML", "Cloud API"];
const DEFAULT_COLORS = [
  { label: "Indigo Glow", value: "from-blue-500 to-indigo-500" },
  { label: "Purple Velvet", value: "from-purple-500 to-pink-500" },
  { label: "Emerald Mint", value: "from-emerald-500 to-teal-500" },
  { label: "Amber Orange", value: "from-amber-500 to-orange-500" },
];

export function ProjectsTab() {
  const { data: projects = [], isLoading } = useProjects();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web Apps");
  const [desc, setDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [stats, setStats] = useState("");
  const [techStack, setTechStack] = useState("");
  const [color, setColor] = useState("from-blue-500 to-indigo-500");

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle("");
    setCategory("Web Apps");
    setDesc("");
    setLongDesc("");
    setStats("");
    setTechStack("");
    setColor("from-blue-500 to-indigo-500");
    setIsModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setCategory(proj.category);
    setDesc(proj.desc);
    setLongDesc(proj.longDesc);
    setStats(proj.stats);
    setTechStack(proj.techStack.join(", "));
    setColor(proj.color);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this case study project?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !desc || !longDesc) {
      alert("Please fill in all required fields.");
      return;
    }

    const techArray = techStack
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload: Partial<Project> = {
      title,
      category,
      desc,
      longDesc,
      stats: stats || "N/A",
      techStack: techArray,
      color,
    };

    if (editingProject) {
      updateMutation.mutate(
        { id: editingProject.id, data: payload },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
  };

  const filtered = projects.filter((proj) => {
    const matchesSearch = proj.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || proj.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-1 gap-3 w-full max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search case studies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4.5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/10 transition-all w-full sm:w-auto justify-center"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            <div className="flex justify-center items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
              <span>Loading dynamic case studies...</span>
            </div>
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((proj) => (
            <div
              key={proj.id}
              className="flex flex-col justify-between rounded-2xl border border-border/40 bg-card overflow-hidden shadow-sm relative group transition-all duration-300 animate-fade-in"
            >
              <div className={`h-1.5 bg-gradient-to-r ${proj.color}`} />

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/20">
                    {proj.category}
                  </span>
                  <span className="text-[10px] font-bold font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2 py-0.5 rounded border border-indigo-100/50 dark:border-indigo-900/30">
                    {proj.stats}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {proj.longDesc || proj.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-muted/60 text-neutral-600 dark:text-neutral-300 border border-border/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto border-t border-border/20 flex justify-end gap-2 pt-3">
                <button
                  onClick={() => openEditModal(proj)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600/30 transition-all"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-muted-foreground text-xs font-semibold">
            No projects found.
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative my-8 w-full max-w-lg rounded-2xl border border-border/40 bg-card p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
                {editingProject ? "Modify Case Study" : "Create Case Study"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Justravels Booking Engine"
                  className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                  >
                    {CATEGORIES.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Gradient Color Theme
                  </label>
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                  >
                    {DEFAULT_COLORS.map((col) => (
                      <option key={col.value} value={col.value}>
                        {col.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Key Stat / KPI *
                </label>
                <input
                  type="text"
                  value={stats}
                  onChange={(e) => setStats(e.target.value)}
                  placeholder="e.g. 2.5M+ requests/day or 99.8% precision"
                  className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Short Description *
                </label>
                <input
                  type="text"
                  required
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Brief 1-sentence tagline of the case study..."
                  className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Detailed Case Summary *
                </label>
                <textarea
                  required
                  rows={4}
                  value={longDesc}
                  onChange={(e) => setLongDesc(e.target.value)}
                  placeholder="Elaborate on the challenges faced, what solutions were deployed, and how the results looked..."
                  className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Tech Stack (comma-separated values)
                </label>
                <input
                  type="text"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  placeholder="Next.js, Nest.js, Redis, PostgreSQL, Docker"
                  className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-border hover:bg-muted px-5 py-2.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/10 transition-all disabled:opacity-50"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : editingProject
                      ? "Update Study"
                      : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
