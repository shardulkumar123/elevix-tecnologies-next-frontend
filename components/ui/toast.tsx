"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  title?: string;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType, title?: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, type: ToastType = "info", title?: string) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type, title }]);

      // Auto dismiss after 4 seconds
      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string, title?: string) => {
      toast(message, "success", title || "Success");
    },
    [toast]
  );

  const error = useCallback(
    (message: string, title?: string) => {
      toast(message, "error", title || "Error");
    },
    [toast]
  );

  const info = useCallback(
    (message: string, title?: string) => {
      toast(message, "info", title || "Notification");
    },
    [toast]
  );

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}

      {/* Toast Portal Container */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        {toasts.map((t) => {
          const isSuccess = t.type === "success";
          const isError = t.type === "error";

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex w-full items-start gap-3 rounded-2xl border bg-card/90 p-4 shadow-xl backdrop-blur-md transition-all duration-300 animate-slide-in ${
                isSuccess
                  ? "border-emerald-500/20 text-emerald-950 dark:text-emerald-100"
                  : isError
                    ? "border-rose-500/20 text-rose-950 dark:text-rose-100"
                    : "border-indigo-500/20 text-neutral-900 dark:text-white"
              }`}
            >
              {/* Type Icon */}
              <div className="shrink-0 mt-0.5">
                {isSuccess ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : isError ? (
                  <AlertCircle className="h-5 w-5 text-rose-500" />
                ) : (
                  <Info className="h-5 w-5 text-indigo-500" />
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 space-y-0.5">
                {t.title && (
                  <p className="text-xs font-black tracking-tight text-neutral-900 dark:text-white uppercase tracking-widest text-[10px]">
                    {t.title}
                  </p>
                )}
                <p className="text-xs font-semibold leading-relaxed text-muted-foreground">
                  {t.message}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => removeToast(t.id)}
                className="shrink-0 text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-lg hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
