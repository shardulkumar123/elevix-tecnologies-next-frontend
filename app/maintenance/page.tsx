import React from "react";
import { Wrench, ShieldAlert } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40 shadow-xl">
          <Wrench className="h-10 w-10 animate-bounce" />
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-950/50 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-300">
            <ShieldAlert className="h-3.5 w-3.5" /> Scheduled System Maintenance
          </div>
          <h1 className="text-3xl font-black text-neutral-900 dark:text-white sm:text-4xl">
            We&apos;ll Be Right Back
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Elevix Technologies client services are currently undergoing planned infrastructure upgrades. We apologize for the inconvenience.
          </p>
        </div>

      </div>
    </div>
  );
}
