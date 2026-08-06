"use client";

import React, { useState } from "react";

import Link from "next/link";

import { ArrowRight, ExternalLink, X } from "lucide-react";

import { useProjects } from "@/features/projects/hooks/use-projects";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Button } from "@/components/ui/button";

import { Project } from "@/features/admin/types";

export default function ProjectsPage() {
  const { data: apiProjects = [], isLoading } = useProjects();
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const activeProjectsList = apiProjects;

  const categories = [
    "All",
    ...Array.from(new Set(activeProjectsList.map((p) => p.category).filter(Boolean))),
  ];

  const filteredProjects =
    activeTab === "All"
      ? activeProjectsList
      : activeProjectsList.filter((p) => p.category === activeTab);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-20 lg:py-24 border-b border-border/40">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_80%,transparent_100%)] opacity-80" />

          <div className="mx-auto max-w-5xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 text-xs font-bold tracking-wide text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
              Case Studies
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-neutral-900 dark:text-white">
              Our Proven{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent font-black">
                Deployments
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Explore our portfolio of scalable web applications, custom developer tooling, and
              high-performance cloud APIs.
            </p>
          </div>
        </section>

        {/* Projects Filter and Grid Section */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Categories Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide border transition-all duration-300 ${
                  activeTab === category
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/15"
                    : "bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="py-20 text-center text-muted-foreground">
              <div className="flex flex-col justify-center items-center gap-3">
                <span className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
                <span className="text-sm font-bold tracking-wide">Syncing case studies...</span>
              </div>
            </div>
          ) : (
            /* Grid Layout */
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:max-w-none">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id || index}
                  onClick={() => setSelectedProject(project)}
                  className="group relative flex flex-col justify-between rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  {/* Header Graphic Gradient */}
                  <div className={`h-2 bg-gradient-to-r ${project.color}`} />

                  <div className="p-8 space-y-6">
                    {/* Category Badges */}
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-muted text-muted-foreground border border-border/40">
                        {project.category}
                      </span>
                      <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2.5 py-0.5 rounded-md border border-indigo-100/50 dark:border-indigo-900/30">
                        {project.stats}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {project.desc || project.longDesc}
                      </p>
                    </div>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted/60 text-neutral-600 dark:text-neutral-300 border border-border/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 pt-0 mt-auto border-t border-border/20 flex items-center justify-between">
                    <span className="text-xs font-bold group-hover:underline flex items-center gap-1">
                      Request Integration Details{" "}
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground/60" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA section */}
        <section className="mx-auto max-w-5xl px-4 py-20 sm:py-24 text-center space-y-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Have a Specific Project Idea?
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground text-sm leading-relaxed">
            Let&apos;s map out the architecture, technologies, and milestones together.
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

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl border border-border/40 bg-card p-0 overflow-hidden shadow-2xl space-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Graphic Gradient */}
            <div className={`h-2.5 bg-gradient-to-r ${selectedProject.color}`} />

            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-muted text-muted-foreground border border-border/40">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2.5 py-0.5 rounded border border-indigo-100/50 dark:border-indigo-900/30">
                    {selectedProject.stats}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="h-9 w-9 inline-flex items-center justify-center rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 leading-relaxed">
                  {selectedProject.desc}
                </p>
                <div className="border-t border-border/40 my-4" />
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Project Overview
                  </h4>
                  <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {selectedProject.longDesc}
                  </p>
                </div>
              </div>

              {/* Tech stack badges */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold px-3 py-1 rounded-lg bg-muted text-neutral-700 dark:text-neutral-300 border border-border/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-border/25 pt-6 flex items-center justify-between">
                <Button
                  asChild
                  className="rounded-xl px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11"
                >
                  <Link
                    href={`/contact?type=${encodeURIComponent(selectedProject.title)}`}
                    className="flex items-center gap-2"
                  >
                    Request Integration Details <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
