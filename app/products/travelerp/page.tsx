"use client";

import React, { useState } from "react";

import * as LucideIcons from "lucide-react";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Button } from "@/components/ui/button";

const modules = [
  {
    name: "Lead Management",
    desc: "Capture, qualify, and track business inquiries from multiple channels automatically.",
    icon: "Filter",
  },
  {
    name: "Customer CRM",
    desc: "Maintain full traveler histories, preferences, loyalty tiers, and communications.",
    icon: "Users",
  },
  {
    name: "Quotation Builder",
    desc: "Compile beautiful, itemized travel quotes and PDF proposals in minutes.",
    icon: "FileText",
  },
  {
    name: "Package Creator",
    desc: "Build standard or customized itinerary packages with flexible markups.",
    icon: "Package",
  },
  {
    name: "Booking System",
    desc: "Manage bookings, passenger manifests, seat grids, and voucher generation.",
    icon: "Calendar",
  },
  {
    name: "Partner Network",
    desc: "Establish portal access, commission structures, and ledger accounts for agents.",
    icon: "Network",
  },
  {
    name: "Supplier Manager",
    desc: "Coordinate supply inventories, bulk contracts, and payment transactions.",
    icon: "Handshake",
  },
  {
    name: "Hotel Coordinator",
    desc: "Link direct room allocations, booking statuses, and meal plan records.",
    icon: "Hotel",
  },
  {
    name: "Transport Sync",
    desc: "Oversee vehicle schedules, driver assignments, flight tickets, and airport transfers.",
    icon: "Plane",
  },
  {
    name: "Visa Operations",
    desc: "Track application stages, document lists, expiry notifications, and fees.",
    icon: "FileCheck",
  },
  {
    name: "Payment Gateway",
    desc: "Process secure online transactions and track credit limits for B2B partners.",
    icon: "CreditCard",
  },
  {
    name: "Invoice & Accounting",
    desc: "Generate GST-compliant invoices, track billing dues, and auto-generate receipts.",
    icon: "Receipt",
  },
  {
    name: "Expense Tracker",
    desc: "Log company operating expenses, vendor bills, commissions, and overheads.",
    icon: "TrendingDown",
  },
  {
    name: "Task Scheduler",
    desc: "Delegate tasks to team members with priority levels and automated deadlines.",
    icon: "CheckSquare",
  },
  {
    name: "Employee Hub",
    desc: "Manage staff directory, access permissions, work performance, and activity logs.",
    icon: "UserCog",
  },
  {
    name: "Reports & Analytics",
    desc: "Extract rich metrics on profit margins, sales performance, and popular destinations.",
    icon: "BarChart3",
  },
  {
    name: "Role-Based Security",
    desc: "Assign strict user permissions, restricting access to sensitive pricing data.",
    icon: "ShieldAlert",
  },
  {
    name: "Alerts & Notifications",
    desc: "Send automated updates, reminders, and payment alerts via WhatsApp/SMS/Email.",
    icon: "Bell",
  },
  {
    name: "Document Vault",
    desc: "Securely store traveler passports, visas, vouchers, and contracts in one place.",
    icon: "FolderLock",
  },
  {
    name: "API Integration Hub",
    desc: "Connect directly to global GDS networks, flight aggregators, and CRM platforms.",
    icon: "Cpu",
  },
];

const integrations = [
  "Razorpay",
  "WhatsApp Business",
  "Google Maps",
  "Google Calendar",
  "Cloudinary",
  "Email Sync",
  "SMS Gateways",
  "GST Billing Engine",
];

const highlights = [
  "Cloud-Based",
  "Multi-Branch Support",
  "Multi-User Access",
  "Role-Based Permissions",
  "Real-Time Reports",
  "Secure & Scalable",
  "Responsive Dashboard",
  "API Ready",
];

const targetAudience = [
  "Travel Agencies",
  "Tour Operators",
  "Destination Management Companies (DMCs)",
  "Corporate Travel Companies",
  "Holiday Package Providers",
  "B2B Travel Partners",
];

const faqs = [
  {
    q: "What is TravelERP?",
    a: "TravelERP is an all-in-one cloud platform engineered to automate travel operations, booking systems, GDS ledgers, invoices, and CRM profiles.",
  },
  {
    q: "When is the launch date?",
    a: "TravelERP is currently in development and is scheduled for initial beta launch in Q4 2026. Register today to reserve early access.",
  },
  {
    q: "Can I connect it to GDS APIs like Amadeus or Sabre?",
    a: "Yes, TravelERP features an integration hub designed to bridge direct bookings with global distribution systems (GDS).",
  },
  {
    q: "Is the platform mobile-responsive?",
    a: "Absolutely. TravelERP is designed with a fully responsive framework, allowing administrators and agents to manage bookings on any mobile device.",
  },
  {
    q: "How secure is user and customer data?",
    a: "We apply industry-standard encryption, secure VPC boundaries, and role-based permissions to protect your proprietary data and customer information.",
  },
];

const testimonials = [
  {
    quote:
      "TravelERP will save our agents hours of manual copy-paste work between spreadsheets and booking engines.",
    author: "Rajesh Mehta",
    role: "Director, Wandermiles Travel",
  },
  {
    quote:
      "Having customer history, invoicing, and quotation builders in a single software is a game-changer.",
    author: "Sarah Fernandes",
    role: "Operations Lead, GlobeTrek Holidays",
  },
];

export default function TravelERPPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "Owner",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden px-4 pt-16 pb-20 lg:pt-20 lg:pb-24 border-b border-border/40">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_80%,transparent_100%)] opacity-80" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              {/* Text info */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    ERP Software
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Coming Soon
                  </span>
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-neutral-900 dark:text-white">
                  TravelERP
                </h1>
                <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  Complete ERP Solution for Travel Businesses
                </p>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                  TravelERP is an all-in-one cloud-based ERP platform designed for travel agencies,
                  tour operators, DMCs, and travel businesses. Manage leads, quotations, bookings,
                  partners, finances, operations, and customer relationships from a single
                  dashboard.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Button
                    size="lg"
                    asChild
                    className="rounded-xl px-7 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 shadow-lg shadow-indigo-600/10"
                  >
                    <a href="#demo-form">Reserve Demo Access</a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="rounded-xl px-6 h-12 border-border/80 font-bold bg-background hover:bg-muted"
                  >
                    <a href="#comparison">See Comparison</a>
                  </Button>
                </div>
              </div>

              {/* Stat callout */}
              <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950/20 to-cyan-950/20 border border-indigo-500/20 rounded-3xl p-8 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-indigo-500 to-cyan-500 opacity-5 blur-2xl group-hover:opacity-10 transition-opacity" />
                <LucideIcons.Plane className="h-14 w-14 text-indigo-500 mx-auto mb-6 animate-bounce" />
                <h3 className="text-5xl font-black text-indigo-600 dark:text-indigo-400">50%</h3>
                <p className="mt-2 text-sm font-extrabold text-neutral-900 dark:text-white">
                  Reduction in Manual Operations
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Automating workflows cuts administrative hours in half.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. MODULES SECTION */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-b border-border/40">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <h2 className="text-xs font-semibold leading-7 text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Functional Modules
            </h2>
            <p className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neutral-900 dark:text-white">
              Built to Control Every Aspect of Your Studio
            </p>
            <p className="text-sm text-muted-foreground">
              A comprehensive system of 20 fully integrated modules working together to power your
              travel business.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((mod, index) => {
              const IconComp = (LucideIcons[mod.icon as keyof typeof LucideIcons] ||
                LucideIcons.Globe) as React.ComponentType<{ className?: string }>;
              return (
                <div
                  key={index}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-500">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {mod.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{mod.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. COMPARISON SECTION */}
        <section
          id="comparison"
          className="mx-auto max-w-5xl px-4 py-16 border-b border-border/40 scroll-mt-20"
        >
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              The Digital Upgrade
            </h2>
            <p className="text-3xl font-black text-neutral-900 dark:text-white">
              Spreadsheets vs TravelERP
            </p>
            <p className="text-sm text-muted-foreground">
              See why manual data logs are holding back your margins and operational scale.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border/60 shadow-md">
            <table className="min-w-full divide-y divide-border/40 text-left text-xs bg-card">
              <thead className="bg-muted/40 font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Capability</th>
                  <th className="px-6 py-4">Legacy Spreadsheets</th>
                  <th className="px-6 py-4 text-indigo-600 dark:text-indigo-400">
                    TravelERP System
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 text-neutral-800 dark:text-neutral-200">
                <tr>
                  <td className="px-6 py-4 font-bold">Automatic Quotations</td>
                  <td className="px-6 py-4 text-red-500">
                    ❌ Manual copy-paste, slow layout compiling
                  </td>
                  <td className="px-6 py-4 text-emerald-500 font-semibold">
                    ✅ One-click PDF proposals in minutes
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">Booking Ledger Sync</td>
                  <td className="px-6 py-4 text-red-500">
                    ❌ Prone to duplicate logs and human error
                  </td>
                  <td className="px-6 py-4 text-emerald-500 font-semibold">
                    ✅ Live database tracking booking items
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">GDS Integrations</td>
                  <td className="px-6 py-4 text-red-500">
                    ❌ None. Requires switching back & forth
                  </td>
                  <td className="px-6 py-4 text-emerald-500 font-semibold">
                    ✅ Connects directly via flight APIs
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">Payment Deadlines</td>
                  <td className="px-6 py-4 text-red-500">
                    ❌ Relies on calendar checks and memory
                  </td>
                  <td className="px-6 py-4 text-emerald-500 font-semibold">
                    ✅ Automated WhatsApp & email alerts
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">Data Privacy Controls</td>
                  <td className="px-6 py-4 text-red-500">
                    ❌ Sheets can be easily shared or copied
                  </td>
                  <td className="px-6 py-4 text-emerald-500 font-semibold">
                    ✅ Strict role-based permissions access
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. DETAILS, INTEGRATIONS & HIGHLIGHTS */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-b border-border/40 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Target Audience */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <LucideIcons.Users className="h-5 w-5 text-indigo-500" /> Target Audience
            </h3>
            <div className="flex flex-wrap gap-2">
              {targetAudience.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-muted text-muted-foreground rounded-lg border border-border/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <LucideIcons.Cpu className="h-5 w-5 text-indigo-500" /> Supported Integrations
            </h3>
            <div className="flex flex-wrap gap-2">
              {integrations.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-muted text-muted-foreground rounded-lg border border-border/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <LucideIcons.Zap className="h-5 w-5 text-indigo-500" /> Platform Highlights
            </h3>
            <div className="flex flex-wrap gap-2">
              {highlights.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-muted text-muted-foreground rounded-lg border border-border/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 5. TESTIMONIALS SECTION */}
        <section className="mx-auto max-w-5xl px-4 py-16 border-b border-border/40">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Industry Reviews
            </h2>
            <p className="text-3xl font-black text-neutral-900 dark:text-white">
              What Partners Say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-card border border-border/60 rounded-2xl p-6 relative overflow-hidden shadow-sm"
              >
                <LucideIcons.Quote className="absolute right-6 top-6 h-12 w-12 text-muted/5 -z-0 pointer-events-none" />
                <p className="text-xs italic text-muted-foreground leading-relaxed relative z-10">
                  &quot;{t.quote}&quot;
                </p>
                <div className="mt-6 pt-4 border-t border-border/30 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-indigo-500/10 text-indigo-500 font-bold text-xs flex items-center justify-center">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">{t.author}</h4>
                    <p className="text-[10px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FAQ SECTION */}
        <section className="mx-auto max-w-4xl px-4 py-16 border-b border-border/40">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Got Questions?
            </h2>
            <p className="text-3xl font-black text-neutral-900 dark:text-white">
              Frequently Asked Questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-card border border-border/50 rounded-xl p-5 space-y-2">
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{faq.q}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. CONTACT / REQUEST DEMO FORM */}
        <section id="demo-form" className="mx-auto max-w-xl px-4 py-16 scroll-mt-20">
          <div className="bg-card border border-border/60 rounded-3xl p-8 shadow-lg text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
                Request a Demo
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Reserve early beta access and receive a guided tour of the TravelERP environment
                when available.
              </p>
            </div>

            {formSubmitted ? (
              <div className="py-6 px-4 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl space-y-3">
                <LucideIcons.CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  Demo Reserved Successfully!
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Thank you for your interest, {formData.name}. We will reach out to you at{" "}
                  {formData.email} to coordinate early beta access credentials.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">
                    Full Name
                  </label>
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl h-10 border border-input bg-background px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">
                      Work Email
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@company.com"
                      className="w-full rounded-xl h-10 border border-input bg-background px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">
                      Phone Number
                    </label>
                    <input
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 9876543210"
                      className="w-full rounded-xl h-10 border border-input bg-background px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">
                      Company Name
                    </label>
                    <input
                      required
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your agency name"
                      className="w-full rounded-xl h-10 border border-input bg-background px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">
                      Your Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full rounded-xl h-10 border border-input bg-background px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="Owner">Owner / CEO</option>
                      <option value="Manager">Operations Manager</option>
                      <option value="Agent">Travel Agent</option>
                      <option value="Developer">Technical Specialist</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground">
                    Custom Requirements / Notes
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your agency size and GDS requirements..."
                    className="w-full rounded-xl min-h-[80px] pt-2.5 border border-input bg-background px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-xl h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Reserve Demo Spot
                </Button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
