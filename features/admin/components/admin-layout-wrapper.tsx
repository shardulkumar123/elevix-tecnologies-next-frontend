"use client";

import React, { useState } from "react";

import { usePathname } from "next/navigation";

import { AuthGuard } from "@/features/auth/components/auth-guard";

import { AdminHeader } from "./admin-header";
import { AdminSidebar, AdminTab } from "./admin-sidebar";

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
}

export function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Derive active tab from current URL pathname
  const getActiveTab = (): AdminTab => {
    if (pathname.includes("/admin/manage-jobs")) return "jobs";
    if (pathname.includes("/admin/industries")) return "industries";
    if (pathname.includes("/admin/services")) return "services";
    if (pathname.includes("/admin/projects")) return "projects";
    if (pathname.includes("/admin/staff")) return "staff";
    if (pathname.includes("/admin/queries")) return "queries";
    if (pathname.includes("/admin/feedback")) return "feedback";
    if (pathname.includes("/admin/about")) return "about-cms";
    if (pathname.includes("/admin/settings")) return "settings";
    return "dashboard";
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const activeTab = getActiveTab();

  return (
    <AuthGuard>
      <div className="flex-1 flex min-h-screen overflow-hidden bg-background">
        {/* Sidebar - Desktop */}
        <div className="hidden md:flex">
          <AdminSidebar
            activeTab={activeTab}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
        </div>

        {/* Sidebar - Mobile Drawer Overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            {/* Menu Drawer */}
            <div className="relative flex w-64 max-w-xs flex-col bg-card animate-slide-in">
              <AdminSidebar
                activeTab={activeTab}
                collapsed={false}
                setCollapsed={() => {}}
                onNavigate={() => setMobileSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content Pane */}
        <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
          <AdminHeader activeTab={activeTab} onMenuToggle={() => setMobileSidebarOpen(true)} />
          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
