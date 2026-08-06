"use client";

import React, { useState } from "react";

import {
  Edit,
  MessageSquare,
  Plus,
  Quote,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";

import { getFeedback, saveFeedback } from "../services/mock-data";
import { FeedbackItem } from "../types";

export function FeedbackTab() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(() => getFeedback());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FeedbackItem | null>(null);

  // Form states
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [quote, setQuote] = useState("");
  const [stars, setStars] = useState(5);
  const [status, setStatus] = useState<"Published" | "Pending" | "Archived">("Published");

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setAuthor("");
    setRole("");
    setCompany("");
    setQuote("");
    setStars(5);
    setStatus("Published");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: FeedbackItem) => {
    setEditingItem(item);
    setAuthor(item.author);
    setRole(item.role);
    setCompany(item.company || "");
    setQuote(item.quote);
    setStars(item.stars);
    setStatus(item.status);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this feedback review?")) {
      const updated = feedbackList.filter((item) => item.id !== id);
      setFeedbackList(updated);
      saveFeedback(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) {
      alert("Please fill in author name and feedback quote.");
      return;
    }

    if (editingItem) {
      const updated = feedbackList.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              author,
              role,
              company,
              quote,
              stars,
              status,
            }
          : item
      );
      setFeedbackList(updated);
      saveFeedback(updated);
    } else {
      const newItem: FeedbackItem = {
        id: `fb-${Date.now()}`,
        author,
        role,
        company,
        quote,
        stars,
        status,
        createdAt: new Date().toISOString().split("T")[0],
      };
      const updated = [newItem, ...feedbackList];
      setFeedbackList(updated);
      saveFeedback(updated);
    }

    setIsModalOpen(false);
  };

  const filteredItems = feedbackList.filter((item) => {
    const matchesSearch =
      item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.company && item.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.quote.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Client Feedback & Reviews</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage public testimonials and client reviews displayed on the main landing page marquee.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Review</span>
        </button>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between bg-card/60 border border-border/40 p-4 rounded-2xl backdrop-blur-md">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by author, company or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>

        <div className="flex items-center gap-2">
          {["All", "Published", "Pending", "Archived"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback list cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-3xl border border-border/50 bg-card p-6 shadow-sm relative overflow-hidden group hover:border-indigo-500/40 transition-all"
          >
            <Quote className="absolute right-4 top-4 h-16 w-16 text-muted/5 pointer-events-none" />

            <div className="space-y-3 relative z-10">
              {/* Header row: stars & status badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    item.status === "Published"
                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                      : item.status === "Pending"
                      ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                      : "bg-neutral-500/10 text-neutral-400 border border-neutral-500/20"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <p className="text-xs italic text-muted-foreground leading-relaxed line-clamp-4">
                &quot;{item.quote}&quot;
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600 font-bold text-xs">
                  {item.author.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-foreground truncate">{item.author}</h4>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {item.role} {item.company ? `• ${item.company}` : ""}
                  </p>
                </div>
              </div>

              {/* Action icons */}
              <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleOpenEditModal(item)}
                  className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title="Edit Feedback"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors cursor-pointer"
                  title="Delete Feedback"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full py-16 text-center bg-card/40 border border-dashed border-border/60 rounded-3xl">
            <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
            <h3 className="text-sm font-bold">No Feedback Found</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Try adjusting your search criteria or add a new client review.
            </p>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-card border border-border w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <h3 className="text-lg font-bold">
                {editingItem ? "Edit Feedback Review" : "Add New Client Feedback"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Job Title / Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VP of Engineering"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Justravels"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as "Published" | "Pending" | "Archived")
                    }
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  >
                    <option value="Published">Published</option>
                    <option value="Pending">Pending</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Star Rating (1 to 5)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      type="button"
                      key={starVal}
                      onClick={() => setStars(starVal)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-5 w-5 ${
                          starVal <= stars
                            ? "fill-amber-400 text-amber-400"
                            : "text-neutral-300 dark:text-neutral-700"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Testimonial Quote *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter detailed client review..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background p-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-border hover:bg-muted transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all cursor-pointer"
                >
                  {editingItem ? "Save Changes" : "Publish Feedback"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
