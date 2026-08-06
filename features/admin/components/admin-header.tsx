"use client";

import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";

import { Bell, CheckCheck, ExternalLink, Menu, MessageSquare, Moon, Search, Star, Sun } from "lucide-react";

import { useContactQueries } from "@/features/contact/hooks/use-contact";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { toggleTheme } from "@/lib/redux/slices/theme-slice";
import { getFeedback } from "../services/mock-data";

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

  // Filter for new queries & pending feedback
  const newQueries = queries.filter((q) => q.status === "New");
  const pendingFeedback = getFeedback().filter((f) => f.status === "Pending");

  const totalNotifications = newQueries.length + pendingFeedback.length;

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
      case "about-cms":
        return "About Page Content Management";
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
            {totalNotifications > 0 && (
              <>
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-extrabold text-white shadow-sm">
                  {totalNotifications}
                </span>
                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-rose-500 animate-ping opacity-75" />
              </>
            )}
          </button>

          {/* Notifications Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-84 rounded-2xl border border-border bg-card p-4 shadow-xl z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-foreground">Notifications</span>
                  {totalNotifications > 0 && (
                    <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-extrabold text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      {totalNotifications} Action Required
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {totalNotifications > 0 ? (
                  <>
                    {/* New Customer Queries */}
                    {newQueries.map((query) => (
                      <Link
                        key={`query-${query.id}`}
                        href="/admin/queries"
                        onClick={() => setDropdownOpen(false)}
                        className="flex gap-3 p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 hover:bg-indigo-100/50 dark:hover:bg-indigo-950/40 border border-indigo-100/50 dark:border-indigo-900/30 transition-colors"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shrink-0 shadow-sm">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-foreground truncate">
                              New Lead: {query.name}
                            </span>
                            <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                              Query
                            </span>
                          </div>
                          <div className="text-[10px] text-muted-foreground truncate font-medium">
                            {query.serviceInterest}
                          </div>
                          <div className="text-[9px] text-muted-foreground/80 truncate">
                            &quot;{query.message}&quot;
                          </div>
                        </div>
                      </Link>
                    ))}

                    {/* Pending Client Feedback */}
                    {pendingFeedback.map((item) => (
                      <Link
                        key={`feedback-${item.id}`}
                        href="/admin/feedback"
                        onClick={() => setDropdownOpen(false)}
                        className="flex gap-3 p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-100/50 dark:hover:bg-amber-950/40 border border-amber-100/50 dark:border-amber-900/30 transition-colors"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white shrink-0 shadow-sm">
                          <Star className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-foreground truncate">
                              Pending Review: {item.author}
                            </span>
                            <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase">
                              Feedback
                            </span>
                          </div>
                          <div className="text-[10px] text-muted-foreground truncate font-medium">
                            {item.role} • {item.company}
                          </div>
                          <div className="text-[9px] text-muted-foreground/80 truncate">
                            &quot;{item.quote}&quot;
                          </div>
                        </div>
                      </Link>
                    ))}
                  </>
                ) : (
                  <div className="py-8 flex flex-col items-center justify-center gap-2 text-center">
                    <div className="h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/40">
                      <CheckCheck className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-foreground">All caught up!</p>
                      <p className="text-[10px] text-muted-foreground">No pending queries or reviews.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-border/60 pt-3 mt-3 flex items-center justify-between">
                <Link
                  href="/admin/queries"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Queries <ExternalLink className="h-3 w-3" />
                </Link>
                <Link
                  href="/admin/feedback"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  Feedback <ExternalLink className="h-3 w-3" />
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
