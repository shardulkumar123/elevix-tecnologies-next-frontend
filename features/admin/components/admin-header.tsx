"use client";

import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";

import { Bell, ExternalLink, Menu, MessageSquare, Moon, Search, Sun } from "lucide-react";

import { useContactQueries } from "@/features/contact/hooks/use-contact";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { toggleTheme } from "@/lib/redux/slices/theme-slice";

interface AdminHeaderProps {
  activeTab: string;
  onMenuToggle?: () => void;
}

export function AdminHeader({ activeTab, onMenuToggle }: AdminHeaderProps) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const { data: queries = [] } = useContactQueries();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter for new/unread queries
  const newQueries = queries.filter((q) => q.status === "New");

  const getTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Dashboard Overview";
      case "jobs":
        return "Job Openings";
      case "industries":
        return "Target Industries";
      case "services":
        return "Core Services";
      case "staff":
        return "Staff & Permissions";
      case "queries":
        return "Customer Queries & Leads";
      case "feedback":
        return "Client Feedback & Reviews";
      case "settings":
        return "System Settings";
      default:
        return "Admin Portal";
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-border/40 bg-background/50 px-6 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <h1 className="text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
          {getTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden sm:block w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Quick search..."
            className="w-full rounded-xl border border-border/60 bg-muted/20 pl-9 pr-4 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground relative"
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5" />
            {newQueries.length > 0 && (
              <>
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-indigo-600" />
              </>
            )}
          </button>

          {/* Notifications Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-card p-4 shadow-xl z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-3">
                <span className="text-sm font-extrabold text-foreground">Notifications</span>
                <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-100/40 dark:border-indigo-900/40">
                  {newQueries.length} New
                </span>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {newQueries.length > 0 ? (
                  newQueries.slice(0, 4).map((query) => (
                    <Link
                      key={query.id}
                      href="/admin/queries"
                      onClick={() => setDropdownOpen(false)}
                      className="flex gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shrink-0">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="text-[11px] font-extrabold text-foreground truncate">
                          {query.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground truncate">
                          {query.serviceInterest}
                        </div>
                        <div className="text-[9px] text-muted-foreground/80 truncate">
                          {query.message}
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="py-6 text-center text-xs text-muted-foreground">
                    No new notifications
                  </div>
                )}
              </div>

              <div className="border-t border-border/60 pt-3 mt-3">
                <Link
                  href="/admin/queries"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View All Queries <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
            Live
          </span>
        </div>
      </div>
    </header>
  );
}
