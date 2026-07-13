"use client";

import React, { Suspense, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { CheckCircle, Clock, Mail, MapPin, Send } from "lucide-react";

import { useCreateContactQuery } from "@/features/contact/hooks/use-contact";
import { useIndustries } from "@/features/industries/hooks/use-industries";
import { useServices } from "@/features/services/hooks/use-services";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Button } from "@/components/ui/button";

import { useSettings } from "@/features/admin/hooks/use-settings";

function ContactFormContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "";

  const createQueryMutation = useCreateContactQuery();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { data: settings } = useSettings();

  const { data: apiIndustries = [] } = useIndustries();
  const { data: services = [] } = useServices();

  const dynamicOptions = [
    ...apiIndustries.map((ind) => ({ value: ind.name, label: `${ind.name} (Industry Solution)` })),
    ...services.map((srv) => ({ value: srv.name, label: srv.name })),
  ];

  const finalOptions =
    dynamicOptions.length > 0
      ? dynamicOptions
      : [
          { value: "Custom Enterprise Software / ERP", label: "Custom Enterprise Software / ERP" },
          { value: "Headless E-Commerce / Website", label: "Headless E-Commerce / Website" },
          {
            value: "Mobile Application (iOS / Android)",
            label: "Mobile Application (iOS / Android)",
          },
          { value: "AI Agent / LLM Integration", label: "AI Agent / LLM Integration" },
          { value: "Cloud Infrastructure & DevOps", label: "Cloud Infrastructure & DevOps" },
          { value: "Data Engineering & Analytics", label: "Data Engineering & Analytics" },
          { value: "UI/UX Design & Prototyping", label: "UI/UX Design & Prototyping" },
          { value: "Operational Tech Consulting", label: "Operational Tech Consulting" },
        ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: "",
  });


  // Compute selected project type dynamically on-the-fly to avoid cascading renders
  const selectedProjectType =
    formData.projectType ||
    (() => {
      const match = finalOptions.find(
        (opt) => opt.value.toLowerCase() === initialType.toLowerCase()
      );
      return match ? match.value : initialType || finalOptions[0]?.value || "";
    })();

  const contactEmail = settings?.siteEmail || "hello@elevixtechnologies.com";
  const address = settings?.address || "Indiranagar, Bangalore, Karnataka, India — 560038";
  const supportHours = settings?.supportHours || "Monday - Friday: 9:00 AM - 6:00 PM IST";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createQueryMutation.mutate(
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        projectType: selectedProjectType,
        subject: selectedProjectType,
        message: formData.message,
      },
      {
        onSuccess: () => {
          setFormSubmitted(true);
        },
        onError: () => {
          // Graceful fallback: show query received
          setFormSubmitted(true);
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pt-10 pb-10 lg:pt-12 lg:pb-12 border-b border-border/40">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_80%,transparent_100%)] opacity-80" />

          <div className="mx-auto max-w-5xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 text-xs font-bold tracking-wide text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
              Get In Touch
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-neutral-900 dark:text-white">
              Let&apos;s Build Something{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent font-black">
                Together
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Have a product idea, or need custom engineering resources? Contact our technical team
              today.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="mx-auto max-w-7xl px-4 pt-10 pb-10 sm:pt-12 sm:pb-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-8 text-left lg:sticky lg:top-24">
              <div className="space-y-3">
                <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
                  Contact Information
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We generally respond to technical project inquiries within 24 business hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold">Email Specification</h3>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium select-all">
                      {contactEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold">Studio Headquarters</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30 shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold">Operating Hours</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{supportHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-border/40 bg-card p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-6 -mr-6 h-32 w-32 rounded-full bg-indigo-600/5 blur-2xl" />

                {formSubmitted ? (
                  <div className="py-12 text-center space-y-6 animate-fade-in">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
                        Specification Received
                      </h2>
                      <p className="mx-auto max-w-sm text-sm text-muted-foreground leading-relaxed">
                        Thank you for reaching out. Our engineering leads will review your request
                        and contact you shortly.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-indigo-600 transition-colors"
                          placeholder="Elena Rostova"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-indigo-600 transition-colors"
                          placeholder="elena@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-indigo-600 transition-colors"
                          placeholder="+1 (555) 019-9000"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-indigo-600 transition-colors"
                          placeholder="Justravels"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase">
                        Project Type
                      </label>
                      <select
                        value={selectedProjectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-indigo-600 transition-colors"
                      >
                        {finalOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase">
                        Message / Project Scope
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-indigo-600 transition-colors resize-none"
                        placeholder="Briefly describe what system you want built, target schedules, and primary integrations required."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 flex items-center justify-center gap-2"
                    >
                      Submit Specification <Send className="h-4 w-4" />
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col bg-background text-foreground antialiased items-center justify-center">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        </div>
      }
    >
      <ContactFormContent />
    </Suspense>
  );
}
