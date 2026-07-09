"use client";

import React from "react";

import Link from "next/link";

import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Clock,
  Cpu,
  FolderGit,
  MessageSquare,
  Users,
} from "lucide-react";

import { useCareers } from "@/features/careers/hooks/use-careers";
import { useContactQueries } from "@/features/contact/hooks/use-contact";
import { useIndustries } from "@/features/industries/hooks/use-industries";
import { useProjects } from "@/features/projects/hooks/use-projects";
import { useServices } from "@/features/services/hooks/use-services";

import { getStaff } from "@/features/admin/services/mock-data";

export default function AdminDashboardPage() {
  const { data: jobs = [] } = useCareers();
  const { data: industries = [] } = useIndustries();
  const { data: services = [] } = useServices();
  const { data: queries = [] } = useContactQueries();
  const { data: projects = [] } = useProjects();

  const staff = getStaff();

  const stats = {
    activeJobs: jobs.filter((j) => j.status === "Active").length,
    industries: industries.filter((i) => i.status === "Active").length,
    services: services.filter((s) => s.status === "Active").length,
    staffCount: staff.filter((s) => s.status === "Active").length,
    unreadQueries: queries.filter((q) => q.status === "New").length,
    projectsCount: projects.length,
  };

  const recentQueries = queries.slice(0, 3);
  const recentJobs = jobs.slice(0, 2);

  const kpiCards = [
    {
      title: "Active Jobs",
      value: stats.activeJobs,
      icon: Briefcase,
      color: "indigo",
      desc: "Live portal listings",
      href: "/admin/manage-jobs",
    },
    {
      title: "Industries",
      value: stats.industries,
      icon: Building2,
      color: "indigo",
      desc: "Target industry segments",
      href: "/admin/industries",
    },
    {
      title: "Active Services",
      value: stats.services,
      icon: Cpu,
      color: "indigo",
      desc: "Service offerings listed",
      href: "/admin/services",
    },
    {
      title: "Staff Count",
      value: stats.staffCount,
      icon: Users,
      color: "indigo",
      desc: "Enrolled admin staff",
      href: "/admin/staff",
    },
    {
      title: "Unread Queries",
      value: stats.unreadQueries,
      icon: MessageSquare,
      color: stats.unreadQueries > 0 ? "rose" : "indigo",
      desc: "New contact leads waiting",
      href: "/admin/queries",
    },
    {
      title: "Projects",
      value: stats.projectsCount,
      icon: FolderGit,
      color: "indigo",
      desc: "Case studies listed",
      href: "/admin/projects",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          const isRose = kpi.color === "rose";
          return (
            <Link
              key={idx}
              href={kpi.href}
              className="p-5 bg-card border border-border/40 hover:border-indigo-500/40 rounded-2xl relative overflow-hidden shadow-sm flex flex-col justify-between h-32 group transition-all"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-muted-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-widest">
                  {kpi.title}
                </span>
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all ${
                    isRose
                      ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 group-hover:bg-rose-100 dark:group-hover:bg-rose-900/60"
                      : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-black text-neutral-900 dark:text-white">
                  {kpi.value}
                </div>
                <div className="text-[10px] text-muted-foreground font-semibold truncate">
                  {kpi.desc}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Double Column Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Queries */}
        <div className="lg:col-span-2 rounded-2xl border border-border/40 bg-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border/20 pb-4">
            <div className="space-y-0.5">
              <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                Incoming Business Queries
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Latest contact form submissions from clients
              </p>
            </div>
            <Link
              href="/admin/queries"
              className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>View All</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentQueries.length > 0 ? (
              recentQueries.map((q) => (
                <div
                  key={q.id}
                  className="flex justify-between items-start p-4 rounded-xl border border-border/20 bg-muted/5 hover:bg-muted/10 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-neutral-900 dark:text-white">
                        {q.name}
                      </span>
                      {q.company && (
                        <span className="text-[10px] text-muted-foreground">({q.company})</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{q.message}</p>
                  </div>

                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold shrink-0 ${
                      q.status === "New"
                        ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30"
                        : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30"
                    }`}
                  >
                    {q.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground text-center py-6">
                No inquiries recorded.
              </p>
            )}
          </div>
        </div>

        {/* Quick Stats list / Active Listings */}
        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border/20 pb-4">
            <div className="space-y-0.5">
              <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                Active Careers
              </h3>
              <p className="text-[11px] text-muted-foreground">Currently hiring job roles</p>
            </div>
            <Link
              href="/admin/manage-jobs"
              className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>Manage</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentJobs.length > 0 ? (
              recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-3.5 rounded-xl border border-border/20 bg-muted/5 space-y-1.5"
                >
                  <div className="font-bold text-xs text-neutral-900 dark:text-white">
                    {job.title}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold">
                    <span>{job.department}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {job.type}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground text-center py-6">No jobs posted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
