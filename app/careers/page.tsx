"use client";

import React, { useState } from "react";

import Link from "next/link";

import {
  ArrowRight,
  Briefcase,
  Clock,
  Coffee,
  DollarSign,
  Globe,
  Heart,
  MapPin,
} from "lucide-react";

import { useCareers } from "@/features/careers/hooks/use-careers";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Button } from "@/components/ui/button";

const perks = [
  {
    title: "100% Remote Operations",
    desc: "Work from anywhere in India with flexible scheduling and full ownership of your deliverables.",
    icon: Globe,
  },
  {
    title: "Learning & Equipment Stipend",
    desc: "Annual allowance for books, online courses, software subscriptions, and premium home-office setup hardware.",
    icon: Coffee,
  },
  {
    title: "Comprehensive Health Support",
    desc: "Premium medical coverage and wellness subscriptions for you and your direct dependents.",
    icon: Heart,
  },
];

export default function CareersPage() {
  const { data: apiJobs = [], isLoading } = useCareers();
  const [activeDept, setActiveDept] = useState("All");

  const jobsList = apiJobs;

  const filteredJobs =
    activeDept === "All" ? jobsList : jobsList.filter((job) => job.department === activeDept);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pt-10 pb-10 lg:pt-12 lg:pb-12 border-b border-border/40">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_80%,transparent_100%)] opacity-80" />

          <div className="mx-auto max-w-5xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 text-xs font-bold tracking-wide text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
              Join Our Team
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-neutral-900 dark:text-white">
              Build Systems that{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent font-black">
                Matter
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              We are looking for dedicated engineers and designers who value speed, security, clean
              code, and operational excellence.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mx-auto max-w-7xl px-4 pt-10 pb-10 sm:pt-12 sm:pb-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {perks.map((perk, index) => {
              const PerkIcon = perk.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-start p-6 bg-card border border-border/40 rounded-2xl shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                    <PerkIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-neutral-900 dark:text-white">
                    {perk.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Job Listings Grid */}
        <section className="border-t border-b border-border/40 bg-muted/10 py-10 sm:py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                Open Opportunities
              </h2>
              <p className="text-sm text-muted-foreground">
                Filter by team department to find your matching role.
              </p>

              {/* Department Filters */}
              <div className="flex justify-center gap-2 pt-4">
                {["All", "Engineering", "Design"].map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setActiveDept(dept)}
                    className={`px-4.5 py-2 rounded-full text-xs font-bold border transition-all duration-300 ${
                      activeDept === dept
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                        : "bg-card border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="space-y-6">
              {filteredJobs.map((item) => {
                const job = item as {
                  id: string;
                  title: string;
                  department: string;
                  location: string;
                  type: string;
                  salary?: string;
                  salaryRange?: string;
                  desc?: string;
                  description?: string;
                  requirements: string[];
                };
                const displaySalary = job.salary || job.salaryRange || "";
                const displayDesc = job.desc || job.description || "";

                return (
                  <div
                    key={job.id}
                    className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 text-left space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3.5 w-3.5" /> {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {job.type}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400">
                            <DollarSign className="h-3.5 w-3.5" /> {displaySalary}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="rounded-xl px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-10 w-fit"
                        asChild
                      >
                        <Link href={`/contact?role=${job.id}`}>Apply Now</Link>
                      </Button>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {displayDesc}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-border/20">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Requirements:
                      </h4>
                      <ul className="list-disc pl-4 text-xs space-y-1.5 text-neutral-700 dark:text-neutral-300">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}

              {filteredJobs.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No roles match the selected filter. Check back soon!
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14 text-center space-y-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Don&apos;t See a Matching Position?
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground text-sm leading-relaxed">
            We are always interested in connecting with talented developers and designers. Send us
            an open application.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="rounded-xl px-7 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 shadow-lg shadow-indigo-600/10"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Send Open Application <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
