"use client";

import React, { useState } from "react";

import { Briefcase, DollarSign, Edit, MapPin, Plus, Search, Trash2, X } from "lucide-react";

import {
  useCareers,
  useCreateCareer,
  useDeleteCareer,
  useUpdateCareer,
} from "@/features/careers/hooks/use-careers";

import { Job } from "../types";

export function JobsTab() {
  const { data: jobs = [], isLoading: isCareersLoading } = useCareers();
  const createMutation = useCreateCareer();
  const updateMutation = useUpdateCareer();
  const deleteMutation = useDeleteCareer();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [locationType, setLocationType] = useState<"Remote" | "Hybrid" | "Onsite">("Remote");
  const [type, setType] = useState<"Full-time" | "Part-time" | "Contract" | "Internship">(
    "Full-time"
  );
  const [salaryRange, setSalaryRange] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");
  const [status, setStatus] = useState<"Active" | "Draft" | "Closed">("Active");
  const [isActive, setIsActive] = useState(true);

  const handleStatusChange = (newStatus: "Active" | "Draft" | "Closed") => {
    setStatus(newStatus);
    setIsActive(newStatus === "Active");
  };

  const handleToggleActiveState = () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);
    if (newActiveState) {
      setStatus("Active");
    } else if (status === "Active") {
      setStatus("Closed");
    }
  };

  const openCreateModal = () => {
    setEditingJob(null);
    setTitle("");
    setDepartment("Engineering");
    setLocation("");
    setLocationType("Remote");
    setType("Full-time");
    setSalaryRange("");
    setDescription("");
    setRequirements("");
    setBenefits("");
    setStatus("Active");
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setTitle(job.title);
    setDepartment(job.department);
    setLocation(job.location);
    setLocationType(job.locationType);
    setType(job.type);
    setSalaryRange(job.salaryRange);
    setDescription(job.description);
    setRequirements(job.requirements.join("\n"));
    setBenefits(job.benefits.join("\n"));
    setStatus(job.status);
    setIsActive(job.status === "Active");
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this job opening?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleActive = (job: Job) => {
    const newStatus = job.status === "Active" ? "Closed" : "Active";
    updateMutation.mutate({
      id: job.id,
      data: {
        ...job,
        status: newStatus,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !department || !location || !salaryRange || !description) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    const reqArray = requirements.split("\n").filter((r) => r.trim() !== "");
    const benArray = benefits.split("\n").filter((b) => b.trim() !== "");

    const payload = {
      title,
      department,
      location,
      locationType,
      type,
      salaryRange,
      description,
      requirements: reqArray,
      benefits: benArray,
      status: status as "Active" | "Draft" | "Closed",
    };

    if (editingJob) {
      updateMutation.mutate(
        { id: editingJob.id, data: payload },
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

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || j.status === statusFilter;
    const matchesType = typeFilter === "All" || j.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-1 flex-wrap gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search job title or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
            />
          </div>

          {/* Filters */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
          >
            <option value="All">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4.5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/10 transition-all w-full sm:w-auto justify-center"
        >
          <Plus className="h-4 w-4" />
          <span>Post New Job</span>
        </button>
      </div>

      {/* Jobs Grid/Table */}
      <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/40 bg-muted/20 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <th className="px-6 py-4">Job Info</th>
                <th className="px-6 py-4">Location & Salary</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Visibility</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20 text-xs font-semibold text-foreground">
              {isCareersLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                    <div className="flex justify-center items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                      <span>Loading job openings...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4.5">
                      <div className="space-y-1">
                        <div className="font-extrabold text-sm text-neutral-900 dark:text-white">
                          {job.title}
                        </div>
                        <div className="flex items-center gap-2.5 text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {job.department}
                          </span>
                          <span>•</span>
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="space-y-1 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location} ({job.locationType})
                        </div>
                        <div className="flex items-center gap-1 font-bold text-neutral-800 dark:text-neutral-200">
                          <DollarSign className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                          {job.salaryRange}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          job.status === "Active"
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30"
                            : job.status === "Draft"
                              ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30"
                              : "bg-neutral-50 dark:bg-neutral-900/50 text-neutral-500 dark:text-neutral-400 border border-neutral-200/40"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <button
                        onClick={() => handleToggleActive(job)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold border transition-colors cursor-pointer ${
                          job.status === "Active"
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
                            : job.status === "Draft"
                              ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50"
                              : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/50"
                        }`}
                        title={
                          job.status === "Active" ? "Click to Deactivate" : "Click to Activate"
                        }
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            job.status === "Active"
                              ? "bg-emerald-500"
                              : job.status === "Draft"
                                ? "bg-amber-500"
                                : "bg-rose-500"
                          }`}
                        />
                        <span>{job.status}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4.5 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(job)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600/30 transition-all"
                        title="Edit Job"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all"
                        title="Delete Job"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                    No job openings found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Creation / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-border/40 bg-card p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
                {editingJob ? "Edit Job Posting" : "Post a New Job Opportunity"}
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
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Senior Backend Architect"
                    className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Engineering, Product, AI"
                    className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Location Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Remote, or Noida, India"
                    className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Location Type
                  </label>
                  <select
                    value={locationType}
                    onChange={(e) =>
                      setLocationType(e.target.value as "Remote" | "Hybrid" | "Onsite")
                    }
                    className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Employment Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) =>
                      setType(
                        e.target.value as "Full-time" | "Part-time" | "Contract" | "Internship"
                      )
                    }
                    className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Salary Range *
                  </label>
                  <input
                    type="text"
                    required
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    placeholder="e.g. $100,000 - $130,000"
                    className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Publishing Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) =>
                      handleStatusChange(e.target.value as "Active" | "Draft" | "Closed")
                    }
                    className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                  >
                    <option value="Active">Active / Public</option>
                    <option value="Draft">Draft</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div className="space-y-1.5 flex flex-col justify-end pb-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                    Job Visibility Toggle
                  </label>
                  <div className="flex items-center gap-3 bg-muted/10 border border-border rounded-xl px-4 py-2 w-full h-[38px] justify-between">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      {isActive ? "Active" : "Inactive"}
                    </span>
                    <button
                      type="button"
                      onClick={handleToggleActiveState}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isActive ? "bg-indigo-600" : "bg-neutral-300 dark:bg-neutral-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isActive ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a comprehensive summary of role expectations, objectives, and responsibilities..."
                  className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Requirements (One per line)
                </label>
                <textarea
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="e.g. 3+ years React experience&#10;BS in Computer Science"
                  className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Benefits (One per line)
                </label>
                <textarea
                  rows={3}
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  placeholder="e.g. Health insurance&#10;401k match"
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
                  {editingJob ? "Save Changes" : "Post Opportunity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
