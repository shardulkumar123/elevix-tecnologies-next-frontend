"use client";

import React from "react";

import Link from "next/link";

import {
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  FolderGit,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Star,
  Users,
} from "lucide-react";

import { Logo } from "@/components/common/logo";

import { useAuth } from "@/features/auth/context/auth-context";

export type AdminTab =
  | "dashboard"
  | "jobs"
  | "industries"
  | "services"
  | "staff"
  | "queries"
  | "feedback"
  | "settings"
  | "projects";

interface AdminSidebarProps {
  activeTab: AdminTab;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onNavigate?: () => void;
}

export function AdminSidebar({
  activeTab,
  collapsed,
  setCollapsed,
  onNavigate,
}: AdminSidebarProps) {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { id: "jobs", label: "Manage Jobs", icon: Briefcase, href: "/admin/manage-jobs" },
    { id: "industries", label: "Industries", icon: Building2, href: "/admin/industries" },
    { id: "services", label: "Services", icon: Cpu, href: "/admin/services" },
    { id: "projects", label: "Projects", icon: FolderGit, href: "/admin/projects" },
    { id: "staff", label: "Staff & Roles", icon: Users, href: "/admin/staff" },
    { id: "queries", label: "Queries", icon: MessageSquare, href: "/admin/queries" },
    { id: "feedback", label: "Client Feedback", icon: Star, href: "/admin/feedback" },
    { id: "settings", label: "Portal Settings", icon: Settings, href: "/admin/settings" },
  ] as const;

  const getInitials = () => {
    if (!user?.email) return "AP";
    const namePart = user.email.split("@")[0];
    const parts = namePart.split(/[\._-]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return namePart.substring(0, 2).toUpperCase();
  };

  const getDisplayName = () => {
    if (!user?.email) return "Administrator";
    const namePart = user.email.split("@")[0];
    return namePart
      .split(/[\._-]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  return (
    <aside
      className={`relative flex flex-col border-r border-border/40 bg-card/60 backdrop-blur-md transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header section */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/40">
        <Link href="/" className="flex items-center gap-3" onClick={onNavigate}>
          <Logo height={collapsed ? 30 : 80} />
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex h-6 w-6 items-center justify-center rounded-md border border-border bg-background hover:bg-muted text-muted-foreground transition-colors absolute -right-3 top-5 z-20"
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 p-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onNavigate}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile */}
      <div className="border-t border-border/40 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white font-bold text-sm select-none">
            {getInitials()}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate text-foreground leading-normal">
                {getDisplayName()}
              </p>
              <p className="text-[10px] text-muted-foreground truncate font-semibold uppercase leading-normal">
                {user?.role || "PORTAL USER"}
              </p>
            </div>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => logout()}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border/40 hover:border-destructive/30 hover:bg-destructive/5 py-2 text-xs font-bold text-muted-foreground hover:text-destructive transition-all cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Exit Portal</span>
          </button>
        )}
      </div>
    </aside>
  );
}
