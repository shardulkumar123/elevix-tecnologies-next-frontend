"use client";

import React from "react";

import Link from "next/link";

import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Factory,
  GitMerge,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Utensils,
} from "lucide-react";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Button } from "@/components/ui/button";

const detailedServices = [
  {
    title: "Restaurants & Hospitality POS",
    category: "Hospitality",
    desc: "Complete digital ecosystem for food service businesses. From table booking to multi-terminal POS and kitchen display integration.",
    icon: Utensils,
    color: "from-orange-500 to-amber-500",
    features: [
      "Real-time Table Ordering & QR Codes",
      "Multi-station Kitchen Display Systems (KDS)",
      "Aggregator Integrations (Zomato, Swiggy)",
      "Inventory & Ingredient Tracking",
    ],
  },
  {
    title: "Hotel Management & Booking",
    category: "Hospitality",
    desc: "Robust Property Management Systems (PMS) and customized direct booking engines that reduce OTA commissions.",
    icon: BedDouble,
    color: "from-blue-500 to-indigo-500",
    features: [
      "Channel Manager Integrations",
      "Interactive Room & Floor Plans",
      "Mobile Check-in & Digital Keys",
      "Automated Guest Communication",
    ],
  },
  {
    title: "Manufacturing & ERP Systems",
    category: "Enterprise",
    desc: "End-to-end supply chain visibility, production floor tracking, shift scheduling, and raw materials planning.",
    icon: Factory,
    color: "from-slate-600 to-zinc-700",
    features: [
      "BOM (Bill of Materials) Management",
      "Machine Downtime Tracking",
      "Compliance & Quality Control Audits",
      "Live Production Dashboards",
    ],
  },
  {
    title: "Inventory & Warehousing",
    category: "Operations",
    desc: "Intelligent stock optimization with barcode/RFID scanning, automatic reorder levels, and vendor management.",
    icon: Package,
    color: "from-amber-500 to-yellow-600",
    features: [
      "Multi-warehouse Sync",
      "LIFO/FIFO Valuation Engines",
      "Pick & Pack Optimization Systems",
      "Supplier Performance Dashboards",
    ],
  },
  {
    title: "Booking & Scheduling Engines",
    category: "Service",
    desc: "Custom scheduling software for service providers, clinics, and consulting firms with automatic reminders.",
    icon: CalendarDays,
    color: "from-emerald-500 to-teal-500",
    features: [
      "Smart Calendar Sync (Google, Outlook)",
      "Automated SMS/Email Reminders",
      "Deposit & Pre-payment Collection",
      "Resource & Staff Allocation",
    ],
  },
  {
    title: "Enterprise Business Automation",
    category: "Enterprise",
    desc: "Connect legacy systems, automate repetitive tasks, and design custom ETL pipelines to eliminate human error.",
    icon: GitMerge,
    color: "from-purple-500 to-violet-600",
    features: [
      "Custom RESTful/GraphQL API Gateways",
      "RPA (Robotic Process Automation) Workflows",
      "Automated Document & Invoice Parsers",
      "Real-time Webhook Systems",
    ],
  },
  {
    title: "E-Commerce Platforms",
    category: "Retail",
    desc: "High-performance headless B2C storefronts and complex wholesale B2B portals built for conversion.",
    icon: ShoppingBag,
    color: "from-rose-500 to-pink-500",
    features: [
      "Sub-second Page Load Speeds",
      "Dynamic Pricing & Discount Engines",
      "Native Payment Gateway Integrations",
      "Abandoned Cart Recovery Funnels",
    ],
  },
  {
    title: "Custom Portals & Dashboards",
    category: "Enterprise",
    desc: "Secure, tailored portals for your employees, vendors, or premium clients with granular permissions.",
    icon: LayoutDashboard,
    color: "from-teal-500 to-cyan-500",
    features: [
      "Role-Based Access Control (RBAC)",
      "Interactive Charts & Canvas PDF Export",
      "Audit Trail & Security Logging",
      "Custom White-labeling Options",
    ],
  },
];

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
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* Header Hero Section */}
        <section className="relative overflow-hidden px-4 pt-10 pb-10 lg:pt-12 lg:pb-12 border-b border-border/40">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_80%,transparent_100%)] opacity-80" />

          <div className="mx-auto max-w-5xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 text-xs font-bold tracking-wide text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
              Capabilities
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-neutral-900 dark:text-white">
              Our Services &{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent font-black">
                Expertise
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              We engineer custom software systems, automation pipelines, and high-performance
              applications designed to scale with your business requirements.
            </p>
          </div>
        </section>

        {/* Detailed Grid Section */}
        <section className="mx-auto max-w-7xl px-4 pt-10 pb-10 sm:pt-12 sm:pb-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {detailedServices.map((service, index) => {
              const IconComp = service.icon;
              return (
                <div
                  key={index}
                  className="group relative flex flex-col justify-between rounded-3xl border border-border/60 bg-card p-8 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  {/* Decorative background gradient */}
                  <div
                    className={`absolute top-0 right-0 h-32 w-32 bg-gradient-to-br ${service.color} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`}
                  />

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-md`}
                      >
                        <IconComp className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-extrabold tracking-wider px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border/40">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {service.desc}
                    </p>

                    {/* Features checklist */}
                    <ul className="mt-6 space-y-2.5">
                      {service.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300"
                        >
                          <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Development Process / How We Work */}
        <section className="border-t border-b border-border/40 bg-muted/20 py-10 sm:py-14">
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
        <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14 text-center space-y-8">
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
