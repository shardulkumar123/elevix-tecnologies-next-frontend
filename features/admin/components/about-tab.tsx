"use client";

import React, { useEffect, useState } from "react";

import { FileText, Plus, Save, Trash2 } from "lucide-react";

import { useAbout, useUpdateAbout } from "@/features/about/hooks/use-about";

import { useToast } from "@/components/ui/toast";

export function AboutTab() {
  const { success, error } = useToast();
  const { data: aboutData, isLoading } = useAbout();
  const updateAboutMutation = useUpdateAbout();

  // About page states
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutSubtitle, setAboutSubtitle] = useState("");
  const [aboutDesc, setAboutDesc] = useState("");
  const [missionTitle, setMissionTitle] = useState("");
  const [missionPointsText, setMissionPointsText] = useState("");
  const [aboutCtaTitle, setAboutCtaTitle] = useState("");
  const [aboutCtaDesc, setAboutCtaDesc] = useState("");
  const [statsList, setStatsList] = useState<{ value: string; label: string }[]>([]);
  const [valuesList, setValuesList] = useState<{ title: string; desc: string; icon: string }[]>([]);

  useEffect(() => {
    if (aboutData) {
      const timer = setTimeout(() => {
        setAboutTitle(aboutData.title || "");
        setAboutSubtitle(aboutData.subtitle || "");
        setAboutDesc(aboutData.description || "");
        setMissionTitle(aboutData.missionTitle || "");
        setMissionPointsText(aboutData.missionPoints?.join("\n") || "");
        setAboutCtaTitle(aboutData.ctaTitle || "");
        setAboutCtaDesc(aboutData.ctaDescription || "");
        setStatsList(aboutData.stats || []);
        setValuesList(aboutData.values || []);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [aboutData]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const aboutPayload = {
      title: aboutTitle,
      subtitle: aboutSubtitle,
      description: aboutDesc,
      missionTitle,
      missionPoints: missionPointsText
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean),
      stats: statsList,
      values: valuesList,
      ctaTitle: aboutCtaTitle,
      ctaDescription: aboutCtaDesc,
    };

    updateAboutMutation.mutate(aboutPayload, {
      onSuccess: () => {
        success("About Page CMS content saved successfully!");
      },
      onError: (err: Error) => {
        error("Failed to save About CMS content: " + err.message);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          <span className="text-xs font-bold text-muted-foreground">Loading About CMS...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-tight text-foreground">About Page CMS</h2>
          <p className="text-xs text-muted-foreground font-medium">
            Manage public about section headings, mission statements, statistics, and core values.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-5">
          <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
            <FileText className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
            <span>Main Banner & Mission Content</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Hero Main Title *
              </label>
              <input
                type="text"
                required
                value={aboutTitle}
                onChange={(e) => setAboutTitle(e.target.value)}
                placeholder="e.g. Engineering High-Performance"
                className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Hero Subtitle (Glow text) *
              </label>
              <input
                type="text"
                required
                value={aboutSubtitle}
                onChange={(e) => setAboutSubtitle(e.target.value)}
                placeholder="e.g. Software"
                className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Hero Description *
            </label>
            <textarea
              required
              rows={3}
              value={aboutDesc}
              onChange={(e) => setAboutDesc(e.target.value)}
              placeholder="Elevix Technologies is a specialized software engineering studio..."
              className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Core Mission Title *
            </label>
            <input
              type="text"
              required
              value={missionTitle}
              onChange={(e) => setMissionTitle(e.target.value)}
              placeholder="e.g. Our Core Mission"
              className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Mission Points / Paragraphs (One per line)
            </label>
            <textarea
              required
              rows={4}
              value={missionPointsText}
              onChange={(e) => setMissionPointsText(e.target.value)}
              placeholder="We believe that software should fit your business operations perfectly..."
              className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
            />
          </div>

          {/* Dynamic Company Stats */}
          <div className="space-y-3 border-t border-border/40 pt-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Company Statistics (Dynamic Stats)
              </label>
              <button
                type="button"
                onClick={() => setStatsList([...statsList, { value: "", label: "" }])}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <Plus className="h-3 w-3" /> Add Stat
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {statsList.map((stat, idx) => (
                <div key={`stat-${idx}`} className="flex items-center gap-2 bg-muted/20 p-2.5 rounded-xl border border-border/40">
                  <input
                    type="text"
                    placeholder="Value (e.g. 100+)"
                    value={stat.value}
                    onChange={(e) => {
                      const copy = [...statsList];
                      copy[idx].value = e.target.value;
                      setStatsList(copy);
                    }}
                    className="w-1/3 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Label (e.g. Projects Delivered)"
                    value={stat.label}
                    onChange={(e) => {
                      const copy = [...statsList];
                      copy[idx].label = e.target.value;
                      setStatsList(copy);
                    }}
                    className="flex-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setStatsList(statsList.filter((_, i) => i !== idx))}
                    className="text-rose-500 hover:text-rose-700 p-1.5 hover:bg-rose-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Core Values */}
          <div className="space-y-3 border-t border-border/40 pt-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Core Engineering Values (Dynamic Values)
              </label>
              <button
                type="button"
                onClick={() => setValuesList([...valuesList, { title: "", desc: "", icon: "Zap" }])}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <Plus className="h-3 w-3" /> Add Value
              </button>
            </div>
            <div className="space-y-3">
              {valuesList.map((val, idx) => (
                <div key={`val-${idx}`} className="p-3.5 rounded-xl bg-muted/20 border border-border/40 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Title (e.g. Performance First)"
                      value={val.title}
                      onChange={(e) => {
                        const copy = [...valuesList];
                        copy[idx].title = e.target.value;
                        setValuesList(copy);
                      }}
                      className="flex-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                    />
                    <select
                      value={val.icon}
                      onChange={(e) => {
                        const copy = [...valuesList];
                        copy[idx].icon = e.target.value;
                        setValuesList(copy);
                      }}
                      className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                    >
                      <option value="Zap">Zap (Lightning)</option>
                      <option value="Shield">Shield (Security)</option>
                      <option value="Heart">Heart (Collaboration)</option>
                      <option value="Target">Target (Delivery)</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => setValuesList(valuesList.filter((_, i) => i !== idx))}
                      className="text-rose-500 hover:text-rose-700 p-1.5 hover:bg-rose-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Value Description..."
                    value={val.desc}
                    onChange={(e) => {
                      const copy = [...valuesList];
                      copy[idx].desc = e.target.value;
                      setValuesList(copy);
                    }}
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border/40 pt-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                CTA Section Title *
              </label>
              <input
                type="text"
                required
                value={aboutCtaTitle}
                onChange={(e) => setAboutCtaTitle(e.target.value)}
                placeholder="Want to Collaborate with Us?"
                className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                CTA Section Description *
              </label>
              <input
                type="text"
                required
                value={aboutCtaDesc}
                onChange={(e) => setAboutCtaDesc(e.target.value)}
                placeholder="Let's build software that makes your business operations run automatically."
                className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-border/40">
          <button
            type="submit"
            disabled={updateAboutMutation.isPending}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/10 transition-all disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{updateAboutMutation.isPending ? "Saving..." : "Save About Content"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AboutTab;

