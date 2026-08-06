"use client";

import React, { useState } from "react";

import { CheckCircle, Code, Cpu, Edit, Plus, Search, Trash2, X } from "lucide-react";

import {
  useCreateService,
  useDeleteService,
  useServices,
  useUpdateService,
} from "@/features/services/hooks/use-services";
import { Service } from "../types";

export function ServicesTab() {
  const { data: apiServices = [], isLoading } = useServices();
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  const services = apiServices;

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const openCreateModal = () => {
    setEditingService(null);
    setName("");
    setDescription("");
    setFeatures("");
    setTechnologies("");
    setStatus("Active");
    setIsModalOpen(true);
  };

  const openEditModal = (srv: Service) => {
    setEditingService(srv);
    setName(srv.name);
    setDescription(srv.description);
    setFeatures(srv.features.join("\n"));
    setTechnologies(srv.technologies.join(", "));
    setStatus(srv.status);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) {
      alert("Please fill in required fields.");
      return;
    }

    const featureArray = features
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f !== "");
    const techArray = technologies
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const payload = {
      name,
      description,
      features: featureArray,
      technologies: techArray,
      status,
    };

    if (editingService) {
      updateMutation.mutate({ id: editingService.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }

    setIsModalOpen(false);
  };

  const filtered = services.filter((srv) =>
    srv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search & Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search service name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
          />
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4.5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/10 transition-all w-full sm:w-auto justify-center"
        >
          <Plus className="h-4 w-4" />
          <span>Add Service Offering</span>
        </button>
      </div>

      {/* Grid of Services */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm font-semibold text-muted-foreground">Loading services from backend API...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.length > 0 ? (
          filtered.map((srv) => (
            <div
              key={srv.id}
              className="flex flex-col justify-between p-6 bg-card border border-border/40 rounded-2xl relative shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      srv.status === "Active"
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30"
                        : "bg-neutral-50 dark:bg-neutral-900/50 text-neutral-500 dark:text-neutral-400 border border-neutral-200/40"
                    }`}
                  >
                    {srv.status}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                  {srv.name}
                </h3>

                <p className="text-xs leading-relaxed text-muted-foreground">{srv.description}</p>

                {/* Features List */}
                {srv.features.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-neutral-800 dark:text-neutral-300 uppercase tracking-wider">
                      Key Deliverables
                    </p>
                    <ul className="space-y-1.5">
                      {srv.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <CheckCircle className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack Tags */}
                {srv.technologies.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <p className="text-[10px] font-bold text-neutral-800 dark:text-neutral-300 uppercase tracking-wider">
                      Tech Stack Focus
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {srv.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1 text-[10px] font-mono text-muted-foreground border border-border/20"
                        >
                          <Code className="h-3 w-3" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-border/20 pt-4">
                <button
                  onClick={() => openEditModal(srv)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600/30 transition-all"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(srv.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-muted-foreground text-xs font-semibold">
            No service offerings found.
          </div>
        )}
      </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl border border-border/40 bg-card p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
                {editingService ? "Modify Service Offering" : "Add Service Capability"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Next-Gen Web Development"
                    className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Publishing Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
                    className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Description Summary *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize the core focus and target customers of the service..."
                  className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Key Deliverables & Features (One per line)
                </label>
                <textarea
                  rows={4}
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="e.g. 100% test coverage&#10;Kubernetes auto-scale setup"
                  className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Core Technologies (Comma-separated)
                </label>
                <input
                  type="text"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  placeholder="e.g. Next.js, Node.js, AWS, TailwindCSS"
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
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/10 transition-all"
                >
                  {editingService ? "Update Offering" : "Add Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
