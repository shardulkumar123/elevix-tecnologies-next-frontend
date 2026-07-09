"use client";

import React, { useEffect, useState } from "react";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";

import { getSettings } from "@/features/admin/services/mock-data";
import { SystemSettings } from "@/features/admin/types";

export default function PrivacyPolicyPage() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSettings(getSettings());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const privacyText = settings?.privacyPolicy || "Privacy Policy has not been configured yet.";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden px-4 py-20 lg:py-24 border-b border-border/40">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_80%,transparent_100%)] opacity-80" />

          <div className="mx-auto max-w-3xl text-center space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-neutral-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Read how Elevix Technologies safeguards your personal information.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap">
            {privacyText}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
