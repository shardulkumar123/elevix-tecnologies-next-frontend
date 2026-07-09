"use client";

import React, { useEffect, useState } from "react";

import {
  Building,
  CheckCircle,
  Eye,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Send,
  Trash2,
  X,
} from "lucide-react";

import { useContactQueries } from "@/features/contact/hooks/use-contact";

import { saveQueries } from "../services/mock-data";
import { ContactQuery } from "../types";

export function QueriesTab() {
  const { data: apiQueries = [], isLoading: isQueriesLoading } = useContactQueries();
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null);

  // Reply state
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (apiQueries.length > 0) {
        setQueries(apiQueries);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [apiQueries]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this query submission?")) {
      const updated = queries.filter((q) => q.id !== id);
      setQueries(updated);
      saveQueries(updated);
      if (selectedQuery?.id === id) {
        setSelectedQuery(null);
      }
    }
  };

  const handleOpenDetails = (q: ContactQuery) => {
    setSelectedQuery(q);
    setReplyText(q.replyMessage || "");

    // Automatically mark "New" queries as "Resolved" or just read if desired. Let's keep it until they reply or resolve.
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuery || !replyText.trim()) return;

    const updated = queries.map((q) => {
      if (q.id === selectedQuery.id) {
        return {
          ...q,
          status: "Replied" as const,
          replyMessage: replyText,
        };
      }
      return q;
    });

    setQueries(updated);
    saveQueries(updated);

    // Update locally selected
    setSelectedQuery({
      ...selectedQuery,
      status: "Replied",
      replyMessage: replyText,
    });

    alert(`Reply successfully simulated to ${selectedQuery.email}!`);
  };

  const handleMarkResolved = () => {
    if (!selectedQuery) return;

    const updated = queries.map((q) => {
      if (q.id === selectedQuery.id) {
        return {
          ...q,
          status: "Resolved" as const,
        };
      }
      return q;
    });

    setQueries(updated);
    saveQueries(updated);

    setSelectedQuery({
      ...selectedQuery,
      status: "Resolved",
    });
  };

  const filtered = queries.filter((q) => {
    const matchesSearch =
      q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.company && q.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "All" || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-1 flex-wrap gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search sender, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
            />
          </div>

          {/* Filters */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Replied">Replied</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Queries Table */}
      <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/40 bg-muted/20 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <th className="px-6 py-4">Sender Info</th>
                <th className="px-6 py-4">Subject / Service</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Received Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20 text-xs font-semibold text-foreground">
              {isQueriesLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                    <div className="flex justify-center items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                      <span>Loading customer queries...</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((q) => (
                  <tr key={q.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4.5">
                      <div className="space-y-1">
                        <div className="font-extrabold text-sm text-neutral-900 dark:text-white">
                          {q.name}
                        </div>
                        <div className="text-muted-foreground font-mono text-[10.5px]">
                          {q.email}
                        </div>
                        {q.company && (
                          <div className="text-[10px] text-muted-foreground italic">
                            Co: {q.company}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="space-y-1">
                        <div className="text-neutral-800 dark:text-neutral-200">
                          {q.serviceInterest || "General Inquiry"}
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate max-w-xs">
                          {q.message}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          q.status === "New"
                            ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30"
                            : q.status === "Replied"
                              ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30"
                              : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30"
                        }`}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-muted-foreground">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenDetails(q)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600/30 transition-all"
                        title="Read Query"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all"
                        title="Delete Query"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                    No inquiries or messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details drawer/modal */}
      {selectedQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl rounded-2xl border border-border/40 bg-card p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
                  Customer Query Detailed View
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuery(null)}
                className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-muted/20 border border-border/40 p-4 rounded-xl text-xs font-semibold text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <p className="text-[9px] text-neutral-400 uppercase">Email</p>
                  <p className="text-neutral-800 dark:text-white font-mono break-all">
                    {selectedQuery.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <p className="text-[9px] text-neutral-400 uppercase">Phone</p>
                  <p className="text-neutral-800 dark:text-white">
                    {selectedQuery.phone || "Not provided"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <p className="text-[9px] text-neutral-400 uppercase">Company</p>
                  <p className="text-neutral-800 dark:text-white">
                    {selectedQuery.company || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                Service Interest
              </h4>
              <p className="text-xs font-bold text-neutral-800 dark:text-white">
                {selectedQuery.serviceInterest || "General Inquiry"}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                Message Content
              </h4>
              <div className="bg-muted/10 border border-border/20 rounded-xl p-4 text-xs font-medium text-foreground whitespace-pre-wrap leading-relaxed">
                {selectedQuery.message}
              </div>
            </div>

            {selectedQuery.status === "Resolved" && (
              <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl p-4 text-xs font-bold">
                <CheckCircle className="h-5 w-5" />
                <span>This lead has been marked as Resolved.</span>
              </div>
            )}

            {/* Reply / Action Form */}
            <div className="space-y-4 border-t border-border/40 pt-6">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white">
                  Send Response Email
                </h4>
                {selectedQuery.status !== "Resolved" && (
                  <button
                    type="button"
                    onClick={handleMarkResolved}
                    className="flex items-center gap-1 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/5 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 transition-all"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>Mark as Resolved</span>
                  </button>
                )}
              </div>

              <form onSubmit={handleSendReply} className="space-y-3">
                <textarea
                  rows={4}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Draft your reply message here..."
                  className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2.5 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                />

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedQuery(null)}
                    className="rounded-xl border border-border hover:bg-muted px-5 py-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-all"
                  >
                    Close Drawer
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/10 transition-all"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{selectedQuery.replyMessage ? "Update Response" : "Send Reply"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
