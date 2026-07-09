"use client";

import React, { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Loader2 } from "lucide-react";

import { useAuth } from "../context/auth-context";

interface GuestGuardProps {
  children: React.ReactNode;
}

export const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // If user is logged in, redirect them to the dashboard or requested page
      let redirect = searchParams.get("redirect") || "/admin";
      // Avoid infinite redirect loops back to login page
      if (redirect.includes("/admin/login")) {
        redirect = "/admin";
      }
      router.push(redirect);
    }
  }, [isLoading, isAuthenticated, router, searchParams]);

  if (isLoading) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <span className="text-xs font-bold text-muted-foreground tracking-wide">
            Checking session...
          </span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return <>{children}</>;
};
