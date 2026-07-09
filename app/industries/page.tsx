"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";

import * as LucideIcons from "lucide-react";

import { useIndustries } from "@/features/industries/hooks/use-industries";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Button } from "@/components/ui/button";

import { Industry } from "@/features/admin/types";

const defaultIndustriesData: Industry[] = [
  {
    id: "restaurants",
    name: "Restaurants",
    slug: "restaurants",
    tagline: "Hospitality",
    desc: "POS, table ordering, kitchen display, delivery integration, and loyalty programs.",
    description:
      "POS, table ordering, kitchen display, delivery integration, and loyalty programs.",
    icon: "Utensils",
    color: "from-orange-500 to-red-500",
    stats: { value: "30%", label: "Increase in table turnover" },
    solutions: [
      "Point of Sale (POS) Systems",
      "Contactless Table Ordering",
      "Kitchen Display Systems (KDS)",
      "Delivery Platform Integrations",
      "Customer Loyalty Programs",
    ],
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "hotels",
    name: "Hotels",
    slug: "hotels",
    tagline: "Hospitality",
    desc: "Booking engines, front desk systems, housekeeping apps, and guest portals.",
    description: "Booking engines, front desk systems, housekeeping apps, and guest portals.",
    icon: "BedDouble",
    color: "from-blue-500 to-cyan-500",
    stats: { value: "45%", label: "Direct booking growth" },
    solutions: [
      "Direct Booking Engines",
      "Front Desk Management Systems",
      "Housekeeping Coordination Apps",
      "Interactive Guest Portals",
      "Channel Manager Integrations",
    ],
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    slug: "manufacturing",
    tagline: "Enterprise",
    desc: "Production tracking, quality control, shift management, and supply chain dashboards.",
    description:
      "Production tracking, quality control, shift management, and supply chain dashboards.",
    icon: "Factory",
    color: "from-slate-600 to-gray-800",
    stats: { value: "20%", label: "Reduction in cycle times" },
    solutions: [
      "Real-Time Production Tracking",
      "Automated Quality Control",
      "Shift & Personnel Management",
      "Supply Chain Telemetry Dashboards",
      "IoT Machine Integrations",
    ],
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "inventory-systems",
    name: "Inventory Systems",
    slug: "inventory-systems",
    tagline: "Operations",
    desc: "Real-time stock management, barcode scanning, reorder alerts, and supplier portals.",
    description:
      "Real-time stock management, barcode scanning, reorder alerts, and supplier portals.",
    icon: "Package",
    color: "from-yellow-500 to-amber-600",
    stats: { value: "99.9%", label: "Stock tracking accuracy" },
    solutions: [
      "Real-time Stock Level Tracking",
      "Mobile Barcode & QR Scanning",
      "Automated Reorder Trigger Alerts",
      "Supplier Collaborative Portals",
      "Warehouse Bin Management",
    ],
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "booking-platforms",
    name: "Booking Platforms",
    slug: "booking-platforms",
    tagline: "Service",
    desc: "Appointment scheduling, resource booking, calendar sync, and customer reminders.",
    description: "Appointment scheduling, resource booking, calendar sync, and customer reminders.",
    icon: "Calendar",
    color: "from-emerald-500 to-teal-600",
    stats: { value: "50%", label: "Fewer appointment no-shows" },
    solutions: [
      "Self-Service Appointment Scheduling",
      "Resource & Equipment Booking",
      "Two-Way Calendar Sync",
      "Automated SMS & Email Reminders",
      "Client Check-In Management",
    ],
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "business-automation",
    name: "Business Automation",
    slug: "business-automation",
    tagline: "Enterprise",
    desc: "Workflow automation, data pipelines, API integrations, and process digitization.",
    description: "Workflow automation, data pipelines, API integrations, and process digitization.",
    icon: "Workflow",
    color: "from-purple-500 to-indigo-600",
    stats: { value: "10x", label: "Faster processing times" },
    solutions: [
      "No-Code & Low-Code Workflow Automation",
      "Secure Data Pipelines & ETL",
      "Custom API Integrations",
      "Legacy Process Digitization",
      "Automated Document Approvals",
    ],
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "e-commerce",
    name: "E-Commerce",
    slug: "e-commerce",
    tagline: "Retail",
    desc: "B2C and B2B online stores with catalog management, payments, and logistics.",
    description: "B2C and B2B online stores with catalog management, payments, and logistics.",
    icon: "ShoppingBag",
    color: "from-rose-500 to-pink-600",
    stats: { value: "3.2s", label: "Average load time" },
    solutions: [
      "Headless B2C/B2B Storefronts",
      "Dynamic Product Catalog Engines",
      "Multi-Gateway Payment Rails",
      "Automated Shipping & Logistics Integration",
      "Tailored Discount & Coupon Systems",
    ],
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "custom-portals",
    name: "Custom Portals",
    slug: "custom-portals",
    tagline: "Enterprise",
    desc: "Partner portals, employee intranets, client dashboards, and reporting platforms.",
    description: "Partner portals, employee intranets, client dashboards, and reporting platforms.",
    icon: "LayoutDashboard",
    color: "from-cyan-500 to-blue-600",
    stats: { value: "98%", label: "User adoption rate" },
    solutions: [
      "Vendor & Partner Collaboration Portals",
      "Employee Intranets & Resource Centers",
      "Personalized Customer Dashboards",
      "Aggregated Business Reporting Panels",
      "Strict Role-Based Access Control (RBAC)",
    ],
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "travel",
    name: "Travel & Tourism",
    slug: "travel",
    tagline: "Operations",
    desc: "Custom flight/hotel booking engines, GDS integrations, itinerary builders, and agent portals.",
    description:
      "Custom flight/hotel booking engines, GDS integrations, itinerary builders, and agent portals.",
    icon: "Plane",
    color: "from-blue-600 to-teal-500",
    stats: { value: "40%", label: "Booking flow automation" },
    solutions: [
      "GDS API Integrations (Amadeus/Sabre)",
      "B2B/B2C Booking Engines",
      "Custom Itinerary Planners",
      "Payment Gateway & Ledger Rails",
      "Agent Commission Management",
    ],
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "custom-software",
    name: "Custom Software & Websites",
    slug: "custom-software",
    tagline: "Engineering",
    desc: "Tailor-made web applications, bespoke CMS integrations, responsive websites, and enterprise systems.",
    description:
      "Tailor-made web applications, bespoke CMS integrations, responsive websites, and enterprise systems.",
    icon: "Code2",
    color: "from-indigo-500 to-purple-600",
    stats: { value: "100%", label: "Bespoke custom solutions" },
    solutions: [
      "Responsive Next.js Frontend Websites",
      "Scalable NestJS Backend APIs",
      "Bespoke Content Management (CMS)",
      "Enterprise System Architectures",
      "Third-Party API Integrations",
    ],
    status: "Active",
    createdAt: new Date().toISOString(),
  },
];

export default function IndustriesPage() {
  const { data: apiIndustries = [], isLoading } = useIndustries();
  const [activeTab, setActiveTab] = useState("restaurants");

  // Combine or fallback to default hardcoded data if api returns empty
  const activeIndustriesList = apiIndustries.length > 0 ? apiIndustries : defaultIndustriesData;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeIndustriesList.length > 0) {
        const exists = activeIndustriesList.some((ind) => ind.id === activeTab);
        if (!exists) {
          setActiveTab(activeIndustriesList[0].id);
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [activeIndustriesList, activeTab]);

  const selectedIndustry =
    activeIndustriesList.find((ind) => ind.id === activeTab) || activeIndustriesList[0];

  // Dynamically resolve icon component
  const SelectedIcon = selectedIndustry
    ? ((LucideIcons[selectedIndustry.icon as keyof typeof LucideIcons] ||
        LucideIcons.Globe) as React.ComponentType<{ className?: string }>)
    : LucideIcons.Globe;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-20 lg:py-24 border-b border-border/40">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_80%,transparent_100%)] opacity-80" />

          <div className="mx-auto max-w-5xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 text-xs font-bold tracking-wide text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
              Industry Verticals
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-neutral-900 dark:text-white">
              Tailored Solutions for{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent font-black">
                Your Industry
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              We design software based on the unique realities of your business domain, avoiding
              generic templates.
            </p>
          </div>
        </section>

        {/* Interactive Industry Showcase */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="py-20 text-center text-muted-foreground">
              <div className="flex flex-col justify-center items-center gap-3">
                <span className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
                <span className="text-sm font-bold tracking-wide">Syncing verticals...</span>
              </div>
            </div>
          ) : (
            <>
              {/* Industry Selection Tabs */}
              <div className="flex flex-wrap justify-center gap-3 border-b border-border/60 pb-8">
                {activeIndustriesList.map((ind) => {
                  const TabIcon = (LucideIcons[ind.icon as keyof typeof LucideIcons] ||
                    LucideIcons.Globe) as React.ComponentType<{ className?: string }>;
                  const isActive = activeTab === ind.id;
                  return (
                    <button
                      key={ind.id}
                      onClick={() => setActiveTab(ind.id)}
                      className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold tracking-wide border transition-all duration-300 ${
                        isActive
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                          : "bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      }`}
                    >
                      <TabIcon className="h-4.5 w-4.5" />
                      {ind.name.split(" & ")[0]}
                    </button>
                  );
                })}
              </div>

              {/* Active Industry Content Card */}
              {selectedIndustry && (
                <div className="mt-12 mx-auto max-w-5xl rounded-3xl border border-border/60 bg-card p-8 sm:p-12 shadow-md relative overflow-hidden transition-all duration-300">
                  {/* Soft decorative background glow */}
                  <div
                    className={`absolute -top-12 -right-12 h-64 w-64 bg-gradient-to-br ${selectedIndustry.color || "from-indigo-600 to-cyan-500"} opacity-5 blur-3xl`}
                  />

                  <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
                    {/* Left Details */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                      <div
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedIndustry.color || "from-indigo-600 to-cyan-500"} text-white shadow-md`}
                      >
                        <SelectedIcon className="h-6 w-6" />
                      </div>

                      <div>
                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white sm:text-3xl">
                          {selectedIndustry.name}
                        </h2>
                        {selectedIndustry.tagline && (
                          <p className="mt-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                            {selectedIndustry.tagline}
                          </p>
                        )}
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {selectedIndustry.desc || selectedIndustry.description}
                      </p>

                      {selectedIndustry.solutions && selectedIndustry.solutions.length > 0 && (
                        <div className="space-y-3 pt-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Core Solutions Provided:
                          </h4>
                          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {selectedIndustry.solutions.map((sol, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300"
                              >
                                <LucideIcons.CheckCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                                <span>{sol}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right Stats Callout */}
                    {selectedIndustry.stats && (
                      <div className="lg:col-span-5 flex flex-col justify-center items-center p-8 rounded-2xl bg-muted/20 border border-border/40 text-center space-y-3">
                        <span className="text-6xl font-black bg-gradient-to-br from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                          {selectedIndustry.stats.value}
                        </span>
                        <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wide max-w-[200px]">
                          {selectedIndustry.stats.label}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        {/* Core Architecture Trust / Focus */}
        <section className="border-t border-b border-border/40 bg-muted/10 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-12 sm:grid-cols-3">
            <div className="text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <LucideIcons.Shield className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold">Compliant & Secure</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our code conforms to modern data standards, incorporating secure uploads, RBAC
                systems, and encryption.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <LucideIcons.Zap className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold">Performance First</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Utilizing Server-Side Rendering (SSR) and edge configurations to achieve sub-second
                content loads.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <LucideIcons.GitMerge className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold">Flexible APIs</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Custom GraphQL or REST interfaces that sync seamlessly with your accounting and
                inventory tools.
              </p>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="mx-auto max-w-5xl px-4 py-20 sm:py-28 text-center space-y-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Let&apos;s Customize a Platform for You
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground text-sm leading-relaxed">
            Contact our engineering team to design a secure digital architecture built specifically
            for your industry&apos;s requirements.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="rounded-xl px-7 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 shadow-lg shadow-indigo-600/10"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Start a Project <LucideIcons.ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
