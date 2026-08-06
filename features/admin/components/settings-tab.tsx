"use client";

import React, { useEffect, useState } from "react";

import {
  Clock,
  FileText,
  Info,
  Mail,
  MapPin,
  Phone,
  Save,
  Sliders,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

import { useToast } from "@/components/ui/toast";
import { useSettings, useUpdateSettings } from "@/features/settings/hooks/use-settings";

import { SystemSettings } from "../types";

export function SettingsTab() {
  const { success, error } = useToast();
  const { data: settingsData, isLoading } = useSettings();
  const updateSettingsMutation = useUpdateSettings();

  // System settings states
  const [siteName, setSiteName] = useState("");
  const [siteEmail, setSiteEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [address, setAddress] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowPublicApplications, setAllowPublicApplications] = useState(true);
  const [maxUploadSizeMb, setMaxUploadSizeMb] = useState(10);
  const [supportHours, setSupportHours] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [termsOfService, setTermsOfService] = useState("");

  useEffect(() => {
    if (settingsData) {
      const timer = setTimeout(() => {
        setSiteName(settingsData.siteName || "");
        setSiteEmail(settingsData.siteEmail || "");
        setContactPhone(settingsData.contactPhone || "");
        setAddress(settingsData.address || "");
        setMaintenanceMode(settingsData.maintenanceMode ?? false);
        setAllowPublicApplications(settingsData.allowPublicApplications ?? true);
        setMaxUploadSizeMb(settingsData.maxUploadSizeMb ?? 10);
        setSupportHours(settingsData.supportHours || "");
        setPrivacyPolicy(settingsData.privacyPolicy || "");
        setTermsOfService(settingsData.termsOfService || "");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [settingsData]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSettings: Partial<SystemSettings> = {
      siteName,
      siteEmail,
      contactPhone,
      address,
      maintenanceMode,
      allowPublicApplications,
      maxUploadSizeMb,
      supportHours,
      privacyPolicy,
      termsOfService,
    };

    updateSettingsMutation.mutate(updatedSettings, {
      onSuccess: () => {
        // Set maintenance mode cookie for middleware check
        if (typeof document !== "undefined") {
          document.cookie = `elevix_maintenance_mode=${maintenanceMode ? "true" : "false"}; path=/; max-age=31536000`;
        }
        success("Settings saved successfully");
      },
      onError: (err) => {
        error(err.message || "Failed to save settings");
      },
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <form onSubmit={handleSave} className="space-y-6">
        {/* Portal Branding */}
        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
            <Sliders className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
            <span>General Portal Configuration</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Portal Application Name *
              </label>
              <input
                type="text"
                required
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="e.g. Elevix Technologies Portal"
                className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Max Attachment Upload Size (MB) *
              </label>
              <input
                type="number"
                required
                value={maxUploadSizeMb}
                onChange={(e) => setMaxUploadSizeMb(Number(e.target.value))}
                placeholder="e.g. 10"
                className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
            <Info className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
            <span>Public Contact Metadata</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Mail className="h-3 w-3 text-muted-foreground" /> Admin Support Email *
              </label>
              <input
                type="email"
                required
                value={siteEmail}
                onChange={(e) => setSiteEmail(e.target.value)}
                placeholder="admin@elevixtechnologies.com"
                className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Phone className="h-3 w-3 text-muted-foreground" /> Contact Telephone *
              </label>
              <input
                type="text"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <MapPin className="h-3 w-3 text-muted-foreground" /> Registered Address *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Full physical office location"
                className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" /> Support Hours *
              </label>
              <input
                type="text"
                required
                value={supportHours}
                onChange={(e) => setSupportHours(e.target.value)}
                placeholder="e.g. Mon - Fri: 9:00 AM - 6:00 PM IST"
                className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-5">
          <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
            Security & System Toggles
          </h3>

          <div className="space-y-4">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between border-b border-border/10 pb-4">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-neutral-800 dark:text-white">
                  Maintenance Mode
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Lock all client portal traffic and display a static maintenance message.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {maintenanceMode ? (
                  <ToggleRight className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <ToggleLeft className="h-8 w-8 text-muted-foreground" />
                )}
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between pb-2">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-neutral-800 dark:text-white">
                  Allow Public Job Applications
                </p>
                <p className="text-[11px] text-muted-foreground">
                  If deactivated, public users can view jobs but cannot submit resumes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAllowPublicApplications(!allowPublicApplications)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {allowPublicApplications ? (
                  <ToggleRight className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <ToggleLeft className="h-8 w-8 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Policies Markdown Content */}
        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
            <FileText className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
            <span>Public Legal Policies (Markdown Support)</span>
          </h3>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Privacy Policy Document Content
              </label>
              <textarea
                rows={6}
                value={privacyPolicy}
                onChange={(e) => setPrivacyPolicy(e.target.value)}
                placeholder="Markdown formatted Privacy Policy..."
                className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Terms of Service Document Content
              </label>
              <textarea
                rows={6}
                value={termsOfService}
                onChange={(e) => setTermsOfService(e.target.value)}
                placeholder="Markdown formatted Terms of Service..."
                className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-border/40">
          <button
            type="submit"
            disabled={isLoading || updateSettingsMutation.isPending}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/10 transition-all disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{updateSettingsMutation.isPending ? "Saving..." : "Save Portal Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
