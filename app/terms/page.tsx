"use client";

import React from "react";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";

import { useSettings } from "@/features/admin/hooks/use-settings";

export default function TermsOfServicePage() {
  const { data: settings } = useSettings();

  const termsText = settings?.termsOfService || "Terms of Service have not been configured yet.";


  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden px-4 py-20 lg:py-24 border-b border-border/40">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_80%,transparent_100%)] opacity-80" />

          <div className="mx-auto max-w-3xl text-center space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-neutral-900 dark:text-white">
              Terms of Service
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Understand your rights and terms when using Elevix Technologies.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap">
            {termsText}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
