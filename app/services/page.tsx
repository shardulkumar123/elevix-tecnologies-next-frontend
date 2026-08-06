"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Factory,
  GitMerge,
  Cpu,
  Globe,
  TrendingUp,
} from "lucide-react";

import { useServices } from "@/features/services/hooks/use-services";

const pillarMetadata: Record<
  string,
  {
    pillar: string;
    icon: React.ElementType;
    desc: string;
    color: string;
    colorBg: string;
  }
> = {
  "Web Solutions": {
    pillar: "Web Solutions",
    icon: Globe,
    desc: "Position your business online with custom, high-speed, and conversion-focused web solutions.",
    color: "from-indigo-500 to-cyan-500",
    colorBg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-500 dark:bg-indigo-500/8 dark:border-indigo-500/20",
  },
  "Business Software": {
    pillar: "Business Software",
    icon: Cpu,
    desc: "Streamline workflows, automate tasks, and govern operations with robust, custom software systems.",
    color: "from-purple-500 to-violet-600",
    colorBg: "bg-purple-500/10 border-purple-500/20 text-purple-500 dark:bg-purple-500/8 dark:border-purple-500/20",
  },
  "Digital Growth": {
    pillar: "Digital Growth",
    icon: TrendingUp,
    desc: "Scale your reach, secure your assets, and keep systems performing at peak levels.",
    color: "from-emerald-500 to-teal-500",
    colorBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 dark:bg-emerald-500/8 dark:border-emerald-500/20",
  },
};

const processes = [
  {
    step: "01",
    title: "Discovery & Planning",
    desc: "We research your business processes, interview stakeholders, and define a clear product roadmap.",
  },
  {
    step: "02",
    title: "Architecture & Design",
    desc: "We map system architectures, database schemas, and create high-fidelity UI/UX mockups.",
  },
  {
    step: "03",
    title: "Agile Development",
    desc: "We build features in bi-weekly sprints, providing staging environments for constant feedback.",
  },
  {
    step: "04",
    title: "QA & Automation",
    desc: "Comprehensive testing including automated unit, integration, and E2E browser test suites.",
  },
  {
    step: "05",
    title: "Deployment & Scale",
    desc: "We launch on premium cloud infrastructure (AWS/Vercel/GCP) with active 24/7 monitoring systems.",
  },
];

export default function ServicesPage() {
  const { data: apiServices = [], isLoading } = useServices();

  // Group services by category/pillar
  const groupedPillars = React.useMemo(() => {
    const categoriesMap: Record<string, typeof apiServices> = {};

    apiServices.forEach((service) => {
      const category = service.category || "Web Solutions";
      if (!categoriesMap[category]) {
        categoriesMap[category] = [];
      }
      categoriesMap[category].push(service);
    });

    return Object.keys(categoriesMap).map((catName) => {
      const meta = pillarMetadata[catName] || {
        pillar: catName,
        icon: Globe,
        desc: "High-performance software and digital capabilities tailored for modern enterprises.",
        color: "from-indigo-500 to-cyan-500",
        colorBg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-500 dark:bg-indigo-500/8 dark:border-indigo-500/20",
      };

      return {
        id: catName.toLowerCase().replace(/\s+/g, "-"),
        ...meta,
        services: categoriesMap[catName],
      };
    });
  }, [apiServices]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* Header Hero Section */}
        <section className="relative overflow-hidden px-4 py-20 lg:py-24 border-b border-border/40">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_80%,transparent_100%)] opacity-80" />

          <div className="mx-auto max-w-5xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 text-xs font-bold tracking-wide text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
              Capabilities
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-neutral-900 dark:text-white">
              Digital Transformation{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent font-black">
                Offerings
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              We partner with organizations to establish, optimize, and scale their online presence through modern engineering offerings.
            </p>
          </div>
        </section>

        {/* Pillars & Detailed Grid Section */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-24">
          {isLoading ? (
            <div className="py-20 text-center text-muted-foreground">
              <div className="flex flex-col justify-center items-center gap-3">
                <span className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
                <span className="text-sm font-bold tracking-wide">Syncing services...</span>
              </div>
            </div>
          ) : (
            groupedPillars.map((pillar) => {
              const PillarIcon = pillar.icon;
              return (
                <div key={pillar.id} className="space-y-10" id={pillar.id}>
                  {/* Pillar Header */}
                  <div className="flex flex-col md:flex-row md:items-center gap-6 pb-6 border-b border-border/40">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${pillar.colorBg} shadow-md`}>
                      <PillarIcon className="h-7 w-7" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                        {pillar.pillar}
                      </h2>
                      <p className="text-muted-foreground text-sm max-w-2xl">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>

                  {/* Sub-services Grid */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {pillar.services.map((service, index) => (
                      <div
                        key={service.id || index}
                        className="group relative flex flex-col justify-between rounded-3xl border border-border/60 bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                      >
                        {/* Decorative background gradient */}
                        <div
                          className={`absolute top-0 right-0 h-24 w-24 bg-gradient-to-br ${pillar.color} opacity-5 blur-xl group-hover:opacity-10 transition-opacity`}
                        />

                        <div>
                          <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {service.name}
                          </h3>

                          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                            {service.description}
                          </p>

                          {/* Features checklist */}
                          {service.features && service.features.length > 0 && (
                            <ul className="mt-5 space-y-2">
                              {service.features.map((feat, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </section>

        {/* Development Process / How We Work */}
        <section className="border-t border-b border-border/40 bg-muted/20 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <h2 className="text-xs font-semibold leading-7 text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Our Methodology
              </h2>
              <p className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neutral-900 dark:text-white">
                How We Deliver Value
              </p>
              <p className="text-base text-muted-foreground">
                A systematic, engineering-first development lifecycle ensuring speed, precision, and
                reliable deployment.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
              {processes.map((proc, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-start p-6 bg-card border border-border/40 rounded-2xl shadow-sm"
                >
                  <span className="text-4xl font-black text-indigo-600/15 dark:text-indigo-400/25 select-none">
                    {proc.step}
                  </span>
                  <h3 className="mt-4 text-base font-extrabold text-neutral-900 dark:text-white">
                    {proc.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{proc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="mx-auto max-w-5xl px-4 py-20 sm:py-28 text-center space-y-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to Build Your System?
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground text-sm leading-relaxed">
            Get in touch for a technical consultation. We will analyze your workflows and design a
            system customized for your business.
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
