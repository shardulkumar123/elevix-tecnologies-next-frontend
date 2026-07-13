"use client";

import React from "react";

import Link from "next/link";

import { Clock, Mail, MapPin } from "lucide-react";

import { useServices } from "@/features/services/hooks/use-services";

import { Logo } from "@/components/common/logo";

import { useSettings } from "@/features/admin/hooks/use-settings";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: services = [] } = useServices();
  const { data: settings } = useSettings();

  const solutionsList =
    services.length > 0
      ? services.slice(0, 5).map((s) => ({ id: s.id, name: s.name, href: "/services" }))
      : [
          { id: "fallback-1", name: "Hospitality POS & Booking", href: "/services" },
          { id: "fallback-2", name: "Manufacturing & ERP", href: "/services" },
          { id: "fallback-3", name: "Inventory & Operations", href: "/services" },
          { id: "fallback-4", name: "E-Commerce Storefronts", href: "/services" },
          { id: "fallback-5", name: "Custom Admin Portals", href: "/services" },
        ];

  const brandName = settings?.siteName || "Elevix Technologies";
  const contactEmail = settings?.siteEmail || "hello@elevixtechnologies.com";
  const contactPhone = settings?.contactPhone || "+91 98765 43210";
  const address = settings?.address || "Indiranagar, Bangalore, Karnataka, India — 560038";
  const supportHours = settings?.supportHours || "Mon - Fri: 9:00 AM - 6:00 PM IST";


  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/20 dark:bg-zinc-950/20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center">
                <Logo size={28} />
              </div>
              <span className="text-lg font-black tracking-tight text-neutral-900 dark:text-white">
                {brandName}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              We engineer custom software systems, automation pipelines, and high-performance
              applications designed to scale with your business requirements.
            </p>
            {/* Contact Details */}
            <div className="space-y-2.5 text-xs text-muted-foreground">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-indigo-500" />
                <span>{address}</span>
              </div>
              {contactEmail && (
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-indigo-500" />
                  <a
                    href={`mailto:${contactEmail}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {contactEmail}
                  </a>
                </div>
              )}
              {contactPhone && (
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-bold text-indigo-500 w-4 shrink-0">Tel</span>
                  <span>{contactPhone}</span>
                </div>
              )}
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-indigo-500" />
                <span>{supportHours}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              {solutionsList.map((sol) => (
                <li key={sol.id}>
                  <Link href={sol.href} className="hover:text-foreground transition-colors">
                    {sol.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Our Studio
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-foreground transition-colors">
                  Careers & Open Roles
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  Our Case Studies
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-foreground transition-colors">
                  Industry Focus
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Support & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact Technical Team
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-muted-foreground">
          <p className="text-center sm:text-left">
            &copy; {currentYear} {brandName} Inc. All rights reserved. High-performance software
            engineering.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
