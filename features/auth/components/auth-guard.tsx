"use client";

import React, { useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

import { Loader2, ShieldAlert } from "lucide-react";

import { useAuth } from "../context/auth-context";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ("ADMIN" | "EDITOR")[];
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login, storing the attempted pathname to redirect back after successful login
      const searchParams = new URLSearchParams();
      if (pathname) {
        searchParams.set("redirect", pathname);
      }
      router.push(`/admin/login?${searchParams.toString()}`);
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <span className="text-xs font-bold text-muted-foreground">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  // Role-based authorization check
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center bg-background text-foreground px-4">
        <div className="max-w-md w-full text-center space-y-6 bg-card border border-border/40 p-8 rounded-3xl shadow-xl backdrop-blur-md">
          <div className="mx-auto h-16 w-16 bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/30 rounded-2xl flex items-center justify-center p-3 text-rose-600 dark:text-rose-400">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-neutral-900 dark:text-white">Access Denied</h3>
            <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
              Your role{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase">
                {user.role}
              </span>{" "}
              does not have permissions to access this administrative console section.
            </p>
          </div>
          <button
            onClick={() => router.push("/admin")}
            className="w-full inline-flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/10 transition-all cursor-pointer"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
