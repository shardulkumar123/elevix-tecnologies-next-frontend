export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  locationType: "Remote" | "Hybrid" | "Onsite";
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  salaryRange: string;
  description: string;
  requirements: string[]; // split by newlines in form
  benefits: string[]; // split by newlines in form
  status: "Active" | "Draft" | "Closed";
  createdAt: string;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // Lucide icon name
  status: "Active" | "Inactive";
  createdAt: string;
  tagline?: string;
  color?: string;
  stats?: { value: string; label: string };
  solutions?: string[];
  desc?: string;
}

export interface Service {
  id: string;
  name: string;
  category?: string;
  description: string;
  features: string[];
  technologies: string[];
  status: "Active" | "Inactive";
  createdAt: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  joinedDate: string;
}

export interface RolePermissions {
  role: string;
  permissions: {
    jobs: { read: boolean; write: boolean; delete: boolean };
    industries: { read: boolean; write: boolean; delete: boolean };
    services: { read: boolean; write: boolean; delete: boolean };
    staff: { read: boolean; write: boolean; delete: boolean };
    queries: { read: boolean; write: boolean; delete: boolean };
    settings: { read: boolean; write: boolean; delete: boolean };
  };
}

export interface ContactQuery {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest?: string;
  message: string;
  status: "New" | "Replied" | "Resolved";
  replyMessage?: string;
  createdAt: string;
}

export interface SystemSettings {
  siteName: string;
  siteEmail: string;
  contactPhone: string;
  address: string;
  maintenanceMode: boolean;
  allowPublicApplications: boolean;
  maxUploadSizeMb: number;
  supportHours: string;
  privacyPolicy: string;
  termsOfService: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  longDesc: string;
  stats: string;
  techStack: string[];
  color: string;
  createdAt: string;
}

export interface About {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  missionTitle: string;
  missionPoints: string[];
  stats: { value: string; label: string }[];
  values: { title: string; desc: string; icon: string }[];
  ctaTitle: string;
  ctaDescription: string;
  createdAt?: string;
}
