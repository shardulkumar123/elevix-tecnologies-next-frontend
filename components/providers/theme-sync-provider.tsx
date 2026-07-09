"use client";

import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { syncThemeFromStorage } from "@/lib/redux/slices/theme-slice";

interface ThemeSyncProviderProps {
  children: React.ReactNode;
}

export function ThemeSyncProvider({ children }: ThemeSyncProviderProps) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);

  // Hydrate theme on mount
  useEffect(() => {
    dispatch(syncThemeFromStorage());
  }, [dispatch]);

  // Synchronize CSS class with Redux state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  return <>{children}</>;
}
