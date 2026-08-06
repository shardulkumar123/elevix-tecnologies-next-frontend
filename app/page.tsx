"use client";

import React, { useState } from "react";

import Link from "next/link";

import {
  Activity,
  ArrowRight,
  BarChart3,
  BedDouble,
  CalendarDays,
  CheckCircle,
  CheckCircle2,
  Clock,
  Cpu,
  Factory,
  GitMerge,
  Globe,
  Heart,
  Hotel,
  LayoutDashboard,
  Mail,
  MapPin,
  Package,
  Phone,
  Plane,
  Play,
  Quote,
  Send,
  ShieldCheck,
  ShoppingBag,
  Star,
  TrendingUp,
  Users,
  Utensils,
  Workflow,
  X,
} from "lucide-react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateContactQuery } from "@/features/contact/hooks/use-contact";
import { useIndustries } from "@/features/industries/hooks/use-industries";
import { useProjects } from "@/features/projects/hooks/use-projects";
import { useServices } from "@/features/services/hooks/use-services";

import { useAbout } from "@/features/about/hooks/use-about";
import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Button } from "@/components/ui/button";

import { useAppSelector } from "@/lib/redux/hooks";

import { getSettings } from "@/features/admin/services/mock-data";
import { Project, SystemSettings } from "@/features/admin/types";

import { getFeedback } from "@/features/admin/services/mock-data";

const INDUSTRIES_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Utensils,
  Bed: BedDouble,
  BedDouble,
  Factory,
  Package,
  Calendar: CalendarDays,
  CalendarDays,
  GitMerge,
  Workflow,
  ShoppingBag,
  LayoutDashboard,
  Globe,
  Activity,
  ShieldCheck,
  Stethoscope: Activity,
  Truck: TrendingUp,
  DollarSign: BarChart3,
  GraduationCap: Users,
  Heart,
};

const getIndustryColorStyles = (colorStr?: string) => {
  if (!colorStr) return "bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20";
  // Match e.g. "from-orange-500"
  const match = colorStr.match(/from-([a-z]+-\d+)/);
  if (match && match[1]) {
    const colorName = match[1];
    return `bg-${colorName}/10 text-${colorName} dark:bg-${colorName}/20`;
  }
  return "bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20";
};

const PRODUCTS_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Plane,
  Hotel,
  Utensils,
};

const products = [
  {
    title: "Elevix Travel Engine",
    tagline: "Global Booking System",
    desc: "A unified booking solution for agencies and tour operators. Integrated directly with Sabre and Amadeus GDS, offering multi-currency checkouts and real-time inventory management.",
    features: [
      "Amadeus & Sabre GDS Integration",
      "Dynamic Tour & Itinerary Builder",
      "Automated Agent Commission Ledger",
    ],
    color: "from-blue-600 to-cyan-500",
    colorBg: "bg-blue-500/10 border-blue-500/20 text-blue-500",
    icon: "Plane",
    stats: "45% faster booking flows",
  },
  {
    title: "Elevix Hotel PMS",
    tagline: "Property Management System",
    desc: "An all-in-one property management dashboard that controls reservations, coordinates housekeeping dispatch, manages room billing grids, and integrates guest check-in portals.",
    features: [
      "Real-Time Room Status Matrix",
      "Automated Housekeeping Queues",
      "Channel Manager Synced Instantly",
    ],
    color: "from-indigo-600 to-purple-500",
    colorBg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-500",
    icon: "Hotel",
    stats: "50% reservation speedup",
  },
  {
    title: "Elevix POS & Table Ordering",
    tagline: "Food & Beverage Operations",
    desc: "A contactless customer ordering platform for restaurants and cafés. Pairs immediate QR-code ordering directly with kitchen displays and loyalty point tracking.",
    features: [
      "Contactless QR-Code Table Ordering",
      "Kitchen Display System (KDS) Feed",
      "Customer Loyalty Engine Built-In",
    ],
    color: "from-orange-600 to-red-500",
    colorBg: "bg-orange-500/10 border-orange-500/20 text-orange-500",
    icon: "Utensils",
    stats: "30% reduced manual labor",
  },
];

const contactFormSchema = yup.object({
  name: yup.string().trim().required("Full name is required").min(2, "Name must be at least 2 characters"),
  email: yup.string().trim().required("Business email is required").email("Please enter a valid email address"),
  phone: yup.string().trim().optional(),
  company: yup.string().trim().optional(),
  projectType: yup.string().trim().required("Please select a primary service interest"),
  message: yup.string().trim().required("Project requirements are required").min(10, "Please provide at least 10 characters describing your project"),
});

type ContactFormData = yup.InferType<typeof contactFormSchema>;

export default function Home() {
  const config = useAppSelector((state) => state.config);
  const { data: aboutData } = useAbout();
  const [activeTab, setActiveTab] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const stats = aboutData?.stats || [
    { value: "100+", label: "Projects Delivered" },
    { value: "20+", label: "Active Clients" },
    { value: "3+", label: "Years of Operations" },
    { value: "99%", label: "Client Retention" },
  ];

  const [testimonials] = useState(() => {
    if (typeof window === "undefined") return [];
    const storedFeedback = getFeedback();
    const published = storedFeedback.filter((f) => f.status === "Published");
    return published.map((item) => ({
      quote: item.quote,
      author: item.author,
      role: item.company ? `${item.role}, ${item.company}` : item.role,
      stars: item.stars,
    }));
  });

  const createContactMutation = useCreateContactQuery();
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const {
    register,
    handleSubmit: handleFormSubmit,
    reset: resetContactForm,
    formState: { errors: contactErrors },
  } = useForm({
    resolver: yupResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "Custom Enterprise Software / ERP",
      message: "",
    },
  });

  const onSubmitContact = (data: ContactFormData) => {
    createContactMutation.mutate(
      {
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        company: data.company || "",
        projectType: data.projectType,
        subject: data.projectType,
        message: data.message,
      },
      {
        onSuccess: () => {
          setContactSubmitted(true);
          resetContactForm();
        },
        onError: () => {
          setContactSubmitted(true);
          resetContactForm();
        },
      }
    );
  };

  const { data: apiProjectsList = [] } = useProjects();
  const { data: apiIndustries = [] } = useIndustries();
  const { data: apiServices = [] } = useServices();

  const serviceOptions = [
    ...apiServices.map((s) => ({ value: s.name, label: s.name })),
    ...apiIndustries.map((ind) => ({ value: ind.name, label: `${ind.name} (Industry Solution)` })),
  ];

  const activeProjectsList = apiProjectsList;

  // Map API models directly
  const resolvedIndustries = apiIndustries.map((ind) => ({
    title: ind.name,
    tag: ind.tagline || "Industry Solution",
    desc: ind.description,
    icon: ind.icon,
    color: getIndustryColorStyles(ind.color),
  }));

  const categories = [
    "All",
    ...Array.from(new Set(activeProjectsList.map((p) => p.category).filter(Boolean))),
  ];

  // Filter projects by category
  const filteredProjects =
    activeTab === "All"
      ? activeProjectsList
      : activeProjectsList.filter((p) => p.category === activeTab);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden px-4 pt-10 pb-10 lg:pt-12 lg:pb-14 border-b border-border/40">
          {/* Custom Grid Pattern matching the mockup */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_80%,transparent_100%)] opacity-80 dark:opacity-40" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
              {/* Left Column (Copy and Stats) */}
              <div className="lg:col-span-7 space-y-8 text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 text-xs font-bold tracking-wide text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
                  <span className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                  Trusted by 40+ businesses across India
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-6xl lg:text-[4rem] leading-[1.1] max-w-2xl">
                  Your Digital{" "}
                  <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent font-black mt-2">
                    Transformation
                  </span>{" "}
                  Partner
                </h1>

                {/* Subtitle Description */}
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                  We help organizations establish and grow their online presence through tailored Web Solutions, custom Business Software, and continuous Digital Growth.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    size="lg"
                    asChild
                    className="rounded-xl px-7 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 shadow-lg shadow-indigo-600/10"
                  >
                    <Link href="#work" className="flex items-center gap-2">
                      View Our Work <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="rounded-xl px-6 h-12 border-border/80 font-bold bg-background hover:bg-muted"
                  >
                    <Link
                      href="/contact"
                      className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200"
                    >
                      <Play className="h-4 w-4 fill-current text-indigo-600" /> Book Free
                      Consultation
                    </Link>
                  </Button>
                </div>

                {/* Metric Statistics Row */}
                <div className="pt-8 border-t border-border/40 grid grid-cols-2 gap-y-6 sm:grid-cols-4 gap-x-4">
                  {stats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="text-3xl font-extrabold text-neutral-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (Layered Floating Mockup Dashboard UI) */}
              <div className="lg:col-span-5 relative flex justify-center items-center py-10 lg:py-0">
                {/* Layer 1: Floating Widget - Top Left (ERP System) */}
                <div className="absolute top-0 left-4 sm:-left-6 z-20 flex items-center gap-3 rounded-2xl border border-border/60 bg-white/90 dark:bg-zinc-900/90 p-4 shadow-xl backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-neutral-900 dark:text-white">
                      ERP System
                    </div>
                    <div className="text-[11px] text-muted-foreground">Live & running</div>
                  </div>
                </div>

                {/* Layer 2: Main Business Dashboard Card */}
                <div className="w-full max-w-[420px] rounded-3xl border border-border/80 bg-white/70 dark:bg-zinc-950/70 shadow-2xl backdrop-blur-md overflow-hidden relative z-10">
                  {/* Browser Mockup Header */}
                  <div className="flex items-center px-4 py-3 bg-neutral-50/50 dark:bg-zinc-900/40 border-b border-border/60">
                    <div className="flex gap-1.5 mr-4">
                      <span className="h-2.5 w-2.5 rounded-full bg-neutral-200 dark:bg-zinc-700" />
                      <span className="h-2.5 w-2.5 rounded-full bg-neutral-200 dark:bg-zinc-700" />
                      <span className="h-2.5 w-2.5 rounded-full bg-neutral-200 dark:bg-zinc-700" />
                    </div>
                    <div className="flex-1 text-center bg-white dark:bg-zinc-900 border border-border/50 rounded-md text-[10px] text-muted-foreground py-1 select-none font-mono">
                      {config.appName.toLowerCase().replace(/\s+/g, "")}.in/dashboard
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-6 space-y-6">
                    {/* Welcome Row */}
                    <div className="flex justify-between items-center">
                      <div className="text-left">
                        <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                          Good morning
                        </div>
                        <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
                          Business Dashboard for {config.userName}
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-950/30 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </div>
                    </div>

                    {/* Metric Cards Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* Revenue */}
                      <div className="rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/40 dark:border-indigo-900/20 p-3 text-left">
                        <BarChart3 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        <div className="text-[10px] text-muted-foreground mt-2">Revenue</div>
                        <div className="text-sm font-black text-indigo-700 dark:text-indigo-300">
                          ₹2.4L
                        </div>
                      </div>

                      {/* Orders */}
                      <div className="rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/40 dark:border-emerald-900/20 p-3 text-left">
                        <Cpu className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <div className="text-[10px] text-muted-foreground mt-2">Orders</div>
                        <div className="text-sm font-black text-emerald-700 dark:text-indigo-300">
                          1,284
                        </div>
                      </div>

                      {/* Clients */}
                      <div className="rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100/40 dark:border-purple-900/20 p-3 text-left">
                        <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        <div className="text-[10px] text-muted-foreground mt-2">Clients</div>
                        <div className="text-sm font-black text-purple-700 dark:text-purple-300">
                          342
                        </div>
                      </div>
                    </div>

                    {/* Miniature Bar Chart Columns */}
                    <div className="pt-2">
                      <div className="flex items-end justify-between gap-1.5 h-16 w-full">
                        <span className="w-full bg-indigo-100 dark:bg-indigo-950/30 rounded-t-md h-6" />
                        <span className="w-full bg-indigo-200 dark:bg-indigo-900/40 rounded-t-md h-10" />
                        <span className="w-full bg-indigo-100 dark:bg-indigo-950/30 rounded-t-md h-8" />
                        <span className="w-full bg-indigo-400 dark:bg-indigo-600 rounded-t-md h-12" />
                        <span className="w-full bg-indigo-200 dark:bg-indigo-900/40 rounded-t-md h-10" />
                        <span className="w-full bg-indigo-500 dark:bg-indigo-500 rounded-t-md h-14" />
                        <span className="w-full bg-indigo-100 dark:bg-indigo-950/30 rounded-t-md h-9" />
                        <span className="w-full bg-indigo-200 dark:bg-indigo-900/40 rounded-t-md h-11" />
                        <span className="w-full bg-indigo-300 dark:bg-indigo-700 rounded-t-md h-13" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer 3: Floating Widget - Bottom Right (Order Placed) */}
                <div className="absolute -bottom-6 right-4 sm:-right-6 z-20 flex items-center gap-3 rounded-2xl border border-border/60 bg-white/90 dark:bg-zinc-900/90 p-4 shadow-xl backdrop-blur-md">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white">
                    <CheckCircle2 className="h-5 w-5 fill-white text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-neutral-900 dark:text-white">
                      Order placed
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">Table 4 — ₹840</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SERVICES SECTION */}
        <div id="services" className="scroll-mt-20" />
        <section
          id="industries"
          className="mx-auto max-w-7xl px-4 pt-12 pb-12 sm:pt-16 sm:pb-16 lg:px-8 border-b border-border/40 scroll-mt-20"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-xs font-semibold leading-7 text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Industry Solutions
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-neutral-900 dark:text-white">
              We know your industry
            </p>
            <p className="mt-4 text-base text-muted-foreground">
              {
                "We don't build generic software. Every solution is designed around the real problems of your specific business."
              }
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resolvedIndustries.map((service, index) => {
              const IconComp = INDUSTRIES_ICON_MAP[service.icon] || Globe;

              // Resolve icon colors matching the screenshot mockup
              let colorClasses =
                "bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:bg-indigo-500/8 dark:border-indigo-500/20 dark:text-indigo-500";
              const lowerTitle = service.title.toLowerCase();
              if (lowerTitle.includes("restaurant")) {
                colorClasses =
                  "bg-orange-500/10 border border-orange-500/20 text-orange-500 dark:bg-orange-500/8 dark:border-orange-500/20 dark:text-orange-500";
              } else if (lowerTitle.includes("hotel")) {
                colorClasses =
                  "bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:bg-blue-500/8 dark:border-blue-500/20 dark:text-blue-500";
              } else if (lowerTitle.includes("manufacturing")) {
                colorClasses =
                  "bg-slate-500/10 border border-slate-500/20 text-slate-500 dark:bg-slate-500/8 dark:border-slate-500/20 dark:text-slate-400";
              } else if (lowerTitle.includes("inventory")) {
                colorClasses =
                  "bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:bg-amber-500/8 dark:border-amber-500/20 dark:text-amber-500";
              } else if (lowerTitle.includes("booking")) {
                colorClasses =
                  "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:bg-emerald-500/8 dark:border-emerald-500/20 dark:text-emerald-500";
              } else if (lowerTitle.includes("automation")) {
                colorClasses =
                  "bg-purple-500/10 border border-purple-500/20 text-purple-500 dark:bg-purple-500/8 dark:border-purple-500/20 dark:text-purple-500";
              } else if (lowerTitle.includes("commerce")) {
                colorClasses =
                  "bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:bg-rose-500/8 dark:border-rose-500/20 dark:text-rose-500";
              } else if (lowerTitle.includes("portal")) {
                colorClasses =
                  "bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 dark:bg-cyan-500/8 dark:border-cyan-500/20 dark:text-cyan-500";
              }

              return (
                <div
                  key={index}
                  className="flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-indigo-500/20 dark:hover:border-indigo-500/30 dark:bg-[#141118] dark:border-white/[0.04] transition-all duration-300"
                >
                  <div>
                    {/* Header Row: Icon + Tag */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorClasses}`}
                      >
                        <IconComp className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded bg-neutral-100 dark:bg-[#221e25] text-muted-foreground dark:text-[#8e8a94] border border-transparent dark:border-white/[0.04]">
                        {service.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="mt-8 text-lg font-bold text-neutral-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground dark:text-[#9b97a2]">
                      {service.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2.5. PRODUCTS SECTION */}
        {/*
        <section
          id="products"
          className="mx-auto max-w-7xl px-4 pt-12 pb-12 sm:pt-16 sm:pb-16 lg:px-8 border-b border-border/40 scroll-mt-20"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-xs font-semibold leading-7 text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Ready-Made Software
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-neutral-900 dark:text-white">
              Our Products
            </p>
            <p className="mt-4 text-base text-muted-foreground">
              Production-ready platforms designed to deploy rapidly and customize around your
              specific requirements.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/20 via-background to-cyan-950/20 p-8 sm:p-10 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-72 w-72 bg-gradient-to-br from-indigo-500 to-cyan-500 opacity-10 blur-[80px] -z-10 group-hover:opacity-15 transition-opacity" />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8 space-y-6 text-left">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    Featured Product
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Coming Soon
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
                    TravelERP
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    Complete ERP Solution for Travel Businesses
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    TravelERP is an all-in-one cloud-based ERP platform designed for travel
                    agencies, tour operators, DMCs, and travel businesses. Manage leads, quotations,
                    bookings, partners, finances, operations, and customer relationships from a
                    single dashboard.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                    <span>Lead Management</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                    <span>Quotation Builder</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                    <span>Invoice & Accounting</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                    <span>GDS & API Integrations</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Button
                    size="default"
                    asChild
                    className="rounded-xl px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                  >
                    <Link href="/products/travelerp">Explore TravelERP</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    asChild
                    className="rounded-xl px-5 border-border/80 font-bold bg-background hover:bg-muted"
                  >
                    <Link href="/products/travelerp#demo-form">Request a Demo</Link>
                  </Button>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl md:h-full">
                <Plane className="h-12 w-12 text-indigo-500 mb-4 animate-bounce" />
                <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">50%</div>
                <div className="text-[11px] font-bold text-muted-foreground mt-1 text-center">
                  Reduction in manual operations
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-7xl grid grid-cols-1 gap-8 lg:grid-cols-3">
            {products.map((product, index) => {
              const IconComp = PRODUCTS_ICON_MAP[product.icon] || Globe;
              return (
                <div
                  key={index}
                  className="flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-indigo-500/20 dark:hover:border-indigo-500/30 dark:bg-[#141118] dark:border-white/[0.04] transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${product.colorBg}`}
                      >
                        <IconComp className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded bg-neutral-100 dark:bg-[#221e25] text-muted-foreground dark:text-[#8e8a94] border border-transparent dark:border-white/[0.04]">
                        {product.tagline}
                      </span>
                    </div>

                    <h3 className="mt-8 text-xl font-bold text-neutral-900 dark:text-white">
                      {product.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground dark:text-[#9b97a2]">
                      {product.desc}
                    </p>

                    <ul className="mt-6 space-y-2.5">
                      {product.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300"
                        >
                          <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between">
                    <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2.5 py-0.5 rounded border border-indigo-100/50 dark:border-indigo-900/30">
                      {product.stats}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                      className="text-xs font-semibold hover:bg-muted text-neutral-800 dark:text-neutral-200"
                    >
                      <Link href="/contact" className="flex items-center gap-1">
                        Get Demo <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        */}

        {/* 3. OUR WORK SECTION */}
        <section
          id="work"
          className="mx-auto max-w-7xl px-6 pt-12 pb-12 sm:pt-16 sm:pb-16 lg:px-8 border-b border-border/40 bg-muted/10 scroll-mt-20"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary uppercase tracking-widest">
              Our Work
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Proven Production Deployments
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              A record of scaling microservices and crafting seamless, modern user interfaces.
            </p>

            {/* Categories filter tabs */}
            <div className="mt-8 flex justify-center gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveTab(category);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 ${
                    activeTab === category
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background text-muted-foreground border-border hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-5xl grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className="group relative flex flex-col justify-between rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {/* Decorative category badge overlay */}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-border/50">
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono bg-background px-2 py-0.5 rounded border border-border/20">
                      {project.stats}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                <div className="p-6 pt-0 mt-auto border-t border-border/20 flex items-center justify-between">
                  <span className="text-xs font-semibold group-hover:underline flex items-center gap-1">
                    View Case Study{" "}
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${project.color}`} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. TESTIMONIALS SECTION */}
        <section
          id="testimonials"
          className="mx-auto max-w-7xl px-6 pt-12 pb-12 sm:pt-16 sm:pb-16 lg:px-8 border-b border-border/40 scroll-mt-20"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary uppercase tracking-widest">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Trusted by Product Leaders
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Read how our production code helps tech engineering departments succeed.
            </p>
          </div>

          {/* Marquee Container with side gradients & pause on hover */}
          <div className="relative mt-12 overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex animate-marquee gap-6">
              {/* Duplicate array twice for continuous seamless marquee */}
              {[...testimonials, ...testimonials].map((t, index) => (
                <div
                  key={index}
                  className="w-[380px] shrink-0 flex flex-col justify-between rounded-3xl border border-border/60 bg-card p-6 shadow-sm relative overflow-hidden transition-all hover:border-primary/40 hover:shadow-md"
                >
                  {/* Background quote icon */}
                  <Quote className="absolute right-5 top-5 h-16 w-16 text-muted/5 -z-0 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(t.stars)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs italic text-muted-foreground leading-relaxed line-clamp-4">
                      &quot;{t.quote}&quot;
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/30 flex items-center gap-3 relative z-10">
                    {/* Avatar mockup */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                      {t.author.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold truncate">{t.author}</h4>
                      <p className="text-[11px] text-muted-foreground truncate">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="py-20 bg-muted/20 border-t border-border/40 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 text-xs font-bold tracking-wide text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
                Get In Touch
              </div>
              <h2 className="text-3xl font-black tracking-tight sm:text-5xl text-neutral-900 dark:text-white">
                Ready to Start Your{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                  Next Project?
                </span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Connect with our technical architects and engineering team to turn your ideas into enterprise-grade software.
              </p>
            </div>

            <div className="mx-auto max-w-3xl">
              {/* Contact Form Card */}
              <div className="w-full">
                <div className="rounded-3xl border border-border/50 bg-card p-6 sm:p-10 shadow-2xl relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 -mt-6 -mr-6 h-32 w-32 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

                  {contactSubmitted ? (
                    <div className="py-12 text-center space-y-6">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30">
                        <CheckCircle className="h-8 w-8" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-neutral-900 dark:text-white">
                          Inquiry Received!
                        </h3>
                        <p className="mx-auto max-w-sm text-sm text-muted-foreground leading-relaxed">
                          Thank you for contacting Elevix Technologies. Our lead architect will review your project details and respond shortly.
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          setContactSubmitted(false);
                          resetContactForm();
                        }}
                        variant="outline"
                        className="rounded-xl font-bold border-border/50"
                      >
                        Send Another Inquiry
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit(onSubmitContact)} className="space-y-6" noValidate>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-neutral-900 dark:text-white">
                          Send Us a Message
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Fill out the form below and we will tailor our response to your specific technical requirements.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="home-contact-name" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="home-contact-name"
                            type="text"
                            placeholder="John Doe"
                            {...register("name")}
                            className={`w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                              contactErrors.name
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                : "border-border focus:border-indigo-500 focus:ring-indigo-500/20"
                            }`}
                          />
                          {contactErrors.name && (
                            <p className="text-xs font-medium text-red-500">{contactErrors.name.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="home-contact-email" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                            Business Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="home-contact-email"
                            type="email"
                            placeholder="john@company.com"
                            {...register("email")}
                            className={`w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                              contactErrors.email
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                : "border-border focus:border-indigo-500 focus:ring-indigo-500/20"
                            }`}
                          />
                          {contactErrors.email && (
                            <p className="text-xs font-medium text-red-500">{contactErrors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="home-contact-phone" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                            Phone Number
                          </label>
                          <input
                            id="home-contact-phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            {...register("phone")}
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="home-contact-company" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                            Company / Organization
                          </label>
                          <input
                            id="home-contact-company"
                            type="text"
                            placeholder="Acme Corp"
                            {...register("company")}
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="home-contact-project" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                          Primary Service Interest
                        </label>
                        <select
                          id="home-contact-project"
                          {...register("projectType")}
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        >
                          {serviceOptions.map((option, idx) => (
                            <option key={idx} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {contactErrors.projectType && (
                          <p className="text-xs font-medium text-red-500">{contactErrors.projectType.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="home-contact-message" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                          Project Requirements & Overview <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="home-contact-message"
                          rows={4}
                          placeholder="Describe your project, timelines, or key challenges..."
                          {...register("message")}
                          className={`w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
                            contactErrors.message
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                              : "border-border focus:border-indigo-500 focus:ring-indigo-500/20"
                          }`}
                        />
                        {contactErrors.message && (
                          <p className="text-xs font-medium text-red-500">{contactErrors.message.message}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={createContactMutation.isPending}
                        className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 h-auto text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
                      >
                        {createContactMutation.isPending ? (
                          "Submitting Inquiry..."
                        ) : (
                          <>
                            Submit Technical Inquiry <Send className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
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
