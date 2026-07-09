"use client";

import React, { useEffect, useState } from "react";

import { Check, Edit, Plus, Search, Shield, ShieldAlert, Trash2, X } from "lucide-react";

import { getRoles, getStaff, saveRoles, saveStaff } from "../services/mock-data";
import { RolePermissions, StaffMember } from "../types";

export function StaffTab() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [roles, setRoles] = useState<RolePermissions[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSubTab, setActiveSubTab] = useState<"roster" | "matrix">("roster");

  // Roster management modals/forms
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [staffName, setStaffName] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [staffRole, setStaffRole] = useState("Editor");
  const [staffStatus, setStaffStatus] = useState<"Active" | "Inactive">("Active");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStaff(getStaff());
      setRoles(getRoles());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const openAddStaffModal = () => {
    setEditingStaff(null);
    setStaffName("");
    setStaffEmail("");
    setStaffRole("Editor");
    setStaffStatus("Active");
    setIsStaffModalOpen(true);
  };

  const openEditStaffModal = (member: StaffMember) => {
    setEditingStaff(member);
    setStaffName(member.name);
    setStaffEmail(member.email);
    setStaffRole(member.role);
    setStaffStatus(member.status);
    setIsStaffModalOpen(true);
  };

  const handleDeleteStaff = (id: string) => {
    if (confirm("Are you sure you want to remove this staff member?")) {
      const updated = staff.filter((m) => m.id !== id);
      setStaff(updated);
      saveStaff(updated);
    }
  };

  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffName || !staffEmail) {
      alert("Name and Email are mandatory.");
      return;
    }

    if (editingStaff) {
      const updated = staff.map((m) =>
        m.id === editingStaff.id
          ? { ...m, name: staffName, email: staffEmail, role: staffRole, status: staffStatus }
          : m
      );
      setStaff(updated);
      saveStaff(updated);
    } else {
      const newMember: StaffMember = {
        id: `staff-${Date.now()}`,
        name: staffName,
        email: staffEmail,
        role: staffRole,
        status: staffStatus,
        joinedDate: new Date().toISOString().split("T")[0],
      };
      const updated = [...staff, newMember];
      setStaff(updated);
      saveStaff(updated);
    }

    setIsStaffModalOpen(false);
  };

  // Matrix permission toggle
  const togglePermission = (
    roleName: string,
    resource: "jobs" | "industries" | "services" | "staff" | "queries" | "settings",
    action: "read" | "write" | "delete"
  ) => {
    if (roleName === "Super Admin") {
      alert("Super Admin permissions cannot be modified; they must retain absolute root access.");
      return;
    }

    const updated = roles.map((r) => {
      if (r.role === roleName) {
        return {
          ...r,
          permissions: {
            ...r.permissions,
            [resource]: {
              ...r.permissions[resource],
              [action]: !r.permissions[resource][action],
            },
          },
        };
      }
      return r;
    });

    setRoles(updated);
    saveRoles(updated);
  };

  const filteredStaff = staff.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableRolesList = ["Super Admin", "Editor", "Recruiter"];
  const resourcesList = ["jobs", "industries", "services", "staff", "queries", "settings"] as const;
  const actionsList = ["read", "write", "delete"] as const;

  return (
    <div className="space-y-6">
      {/* Sub-Tabs Nav */}
      <div className="flex border-b border-border/40 pb-px">
        <button
          onClick={() => setActiveSubTab("roster")}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 -mb-px ${
            activeSubTab === "roster"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Staff Roster ({staff.length})
        </button>
        <button
          onClick={() => setActiveSubTab("matrix")}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 -mb-px ${
            activeSubTab === "matrix"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Roles & Permissions Matrix
        </button>
      </div>

      {activeSubTab === "roster" ? (
        <div className="space-y-6">
          {/* Search & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search staff name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
              />
            </div>

            <button
              onClick={openAddStaffModal}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4.5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/10 transition-all w-full sm:w-auto justify-center"
            >
              <Plus className="h-4 w-4" />
              <span>Add Staff Member</span>
            </button>
          </div>

          {/* Roster Table */}
          <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/40 bg-muted/20 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <th className="px-6 py-4">Name & Email</th>
                    <th className="px-6 py-4">Security Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Joined Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 text-xs font-semibold text-foreground">
                  {filteredStaff.length > 0 ? (
                    filteredStaff.map((member) => (
                      <tr key={member.id} className="hover:bg-muted/10 transition-colors">
                        <td className="px-6 py-4.5">
                          <div className="space-y-1">
                            <div className="font-extrabold text-sm text-neutral-900 dark:text-white">
                              {member.name}
                            </div>
                            <div className="text-muted-foreground font-mono text-[10.5px]">
                              {member.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4.5">
                          <div className="flex items-center gap-1.5">
                            {member.role === "Super Admin" ? (
                              <ShieldAlert className="h-4 w-4 text-rose-500" />
                            ) : (
                              <Shield className="h-4 w-4 text-indigo-500" />
                            )}
                            <span>{member.role}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4.5">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              member.status === "Active"
                                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30"
                                : "bg-neutral-50 dark:bg-neutral-900/50 text-neutral-500 dark:text-neutral-400 border border-neutral-200/40"
                            }`}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-muted-foreground">{member.joinedDate}</td>
                        <td className="px-6 py-4.5 text-right space-x-2">
                          <button
                            onClick={() => openEditStaffModal(member)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600/30 transition-all"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteStaff(member.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-all"
                            disabled={member.id === "staff-1" || member.id === "staff-3"}
                            title={
                              member.id === "staff-1" || member.id === "staff-3"
                                ? "Cannot remove original Super Admins"
                                : "Remove"
                            }
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                        No staff members found matching query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/40 bg-card p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
              Interactive Permission Rules Mapping
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Define access rights across portal modules. Changes updated in real-time. Super Admin
              rights remain fixed.
            </p>
          </div>

          <div className="space-y-8">
            {roles.map((roleObj) => (
              <div
                key={roleObj.role}
                className="rounded-2xl border border-border/40 bg-card overflow-hidden shadow-sm"
              >
                <div className="bg-muted/30 px-6 py-4 border-b border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-extrabold text-sm text-neutral-900 dark:text-white">
                      {roleObj.role} Role
                    </span>
                  </div>
                  {roleObj.role === "Super Admin" && (
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/30 rounded-full px-2.5 py-0.5">
                      System Locked
                    </span>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border/30 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                        <th className="px-6 py-3">Module Resource</th>
                        <th className="px-6 py-3 text-center">Read</th>
                        <th className="px-6 py-3 text-center">Write / Edit</th>
                        <th className="px-6 py-3 text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/10 text-xs font-semibold">
                      {resourcesList.map((resource) => (
                        <tr key={resource} className="hover:bg-muted/5">
                          <td className="px-6 py-3 text-neutral-800 dark:text-neutral-200 capitalize font-bold">
                            {resource === "queries" ? "Customer Queries" : resource}
                          </td>
                          {actionsList.map((action) => {
                            const isAllowed = roleObj.permissions[resource][action];
                            return (
                              <td key={action} className="px-6 py-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => togglePermission(roleObj.role, resource, action)}
                                  className={`inline-flex items-center justify-center p-1.5 rounded-lg border transition-all ${
                                    isAllowed
                                      ? "bg-indigo-600 border-indigo-600 text-white"
                                      : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/80"
                                  } ${roleObj.role === "Super Admin" ? "opacity-90 cursor-not-allowed" : ""}`}
                                >
                                  {isAllowed ? (
                                    <Check className="h-4.5 w-4.5" />
                                  ) : (
                                    <span className="h-4.5 w-4.5 block" />
                                  )}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Staff Roster Modal */}
      {isStaffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-border/40 bg-card p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
                {editingStaff ? "Edit Profile Settings" : "Enroll New Staff Member"}
              </h3>
              <button
                onClick={() => setIsStaffModalOpen(false)}
                className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleStaffSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  placeholder="e.g. Shardul Kumar"
                  className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  placeholder="e.g. shardul@elevixtechnologies.com"
                  className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Role Category
                  </label>
                  <select
                    value={staffRole}
                    onChange={(e) => setStaffRole(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                  >
                    {availableRolesList.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Portal Status
                  </label>
                  <select
                    value={staffStatus}
                    onChange={(e) => setStaffStatus(e.target.value as "Active" | "Inactive")}
                    className="w-full rounded-xl border border-border bg-muted/10 px-3 py-2 text-xs font-semibold focus:border-indigo-600 focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => setIsStaffModalOpen(false)}
                  className="rounded-xl border border-border hover:bg-muted px-5 py-2.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/10 transition-all"
                >
                  {editingStaff ? "Save Settings" : "Enroll"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
