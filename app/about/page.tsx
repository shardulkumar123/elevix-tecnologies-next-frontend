"use client";

import React from "react";

import Link from "next/link";

import { ArrowRight, Heart, Shield, Target, Zap } from "lucide-react";

import { useAbout } from "@/features/about/hooks/use-about";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Button } from "@/components/ui/button";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Shield,
  Heart,
  Target,
};

export default function AboutPage() {
  const { data: about, isLoading } = useAbout();

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <span className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
            <span className="text-sm font-bold tracking-wide">Loading studio details...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const title = about?.title || "Engineering High-Performance";
  const subtitle = about?.subtitle || "Software";
  const description =
    about?.description ||
    "Elevix Technologies is a specialized software engineering studio building performant digital tools, secure enterprise portals, and bespoke AI applications.";
  const missionTitle = about?.missionTitle || "Our Core Mission";
  const missionPoints = about?.missionPoints || [
    "We believe that software should fit your business operations perfectly, rather than forcing you to adjust your workflows to generic template solutions.",
    "Our focus remains squarely on software architecture, clean state management, security boundaries, and responsive interfaces that load instantly across all form factors.",
    "We deliver our work as fast as possible with high-quality code, utilizing industry-standard methods and agile development practices.",
  ];
  const stats = about?.stats || [
    { value: "150+", label: "Projects Delivered" },
    { value: "50+", label: "Active Clients" },
    { value: "5+", label: "Years of Operations" },
    { value: "99%", label: "Client Retention" },
  ];
  const values = about?.values || [
    {
      title: "Performance First",
      desc: "We measure system speeds in milliseconds and page loading times in sub-seconds. Speed directly impacts conversions and business efficiency.",
      icon: "Zap",
    },
    {
      title: "Secure-by-Design",
      desc: "From strict role-based access controls to encrypted file handling, data integrity and compliance form the baseline of every architecture we deploy.",
      icon: "Shield",
    },
    {
      title: "Client-Centric Collaboration",
      desc: "We act as your technical engineering partners, translating business operations directly into custom, maintainable digital platforms.",
      icon: "Heart",
    },
    {
      title: "Rapid & Reliable Delivery",
      desc: "We deliver your projects as fast as possible using industry-standard methodologies and high-quality, maintainable code.",
      icon: "Target",
    },
  ];
  const ctaTitle = about?.ctaTitle || "Want to Collaborate with Us?";
  const ctaDescription =
    about?.ctaDescription ||
    "Let's build software that makes your business operations run automatically.";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pt-10 pb-10 lg:pt-12 lg:pb-12 border-b border-border/40">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_80%,transparent_100%)] opacity-80" />

          <div className="mx-auto max-w-5xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 text-xs font-bold tracking-wide text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
              Our Story
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-neutral-900 dark:text-white">
              {title}{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent font-black">
                {subtitle}
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="mx-auto max-w-7xl px-4 pt-10 pb-10 sm:pt-12 sm:pb-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6 text-left">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                {missionTitle}
              </h2>
              {missionPoints.map((point, idx) => (
                <p key={idx} className="text-sm leading-relaxed text-muted-foreground">
                  {point}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 bg-muted/20 border border-border/40 p-8 rounded-3xl relative">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1 text-center sm:text-left">
                  <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400">
                    {stat.value}
                  </span>
                  <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="border-t border-b border-border/40 bg-muted/10 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center space-y-4 mb-8">
              <h2 className="text-xs font-semibold leading-7 text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Our Principles
              </h2>
              <p className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neutral-900 dark:text-white">
                How We Make Decisions
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((val, idx) => {
                const ValueIcon = ICON_MAP[val.icon] || Heart;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-start p-6 bg-card border border-border/40 rounded-2xl shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                      <ValueIcon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-extrabold text-neutral-900 dark:text-white">
                      {val.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14 text-center space-y-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{ctaTitle}</h2>
          <p className="mx-auto max-w-xl text-muted-foreground text-sm leading-relaxed">
            {ctaDescription}
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="rounded-xl px-7 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 shadow-lg shadow-indigo-600/10"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Start a Project <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
