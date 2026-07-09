import {
  INITIAL_INDUSTRIES,
  INITIAL_JOBS,
  INITIAL_PROJECTS,
  INITIAL_QUERIES,
  INITIAL_ROLES,
  INITIAL_SERVICES,
  INITIAL_SETTINGS,
  INITIAL_STAFF,
} from "@/constants/admin-dummy";

import {
  About,
  ContactQuery,
  Industry,
  Job,
  Project,
  RolePermissions,
  Service,
  StaffMember,
  SystemSettings,
} from "../types";

const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (err) {
    console.error(`Error loading key "${key}" from localStorage:`, err);
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing key "${key}" to localStorage:`, err);
  }
};

export const getJobs = (): Job[] => getStorageItem("admin_jobs", INITIAL_JOBS);
export const saveJobs = (jobs: Job[]): void => setStorageItem("admin_jobs", jobs);

export const getIndustries = (): Industry[] =>
  getStorageItem("admin_industries", INITIAL_INDUSTRIES);
export const saveIndustries = (industries: Industry[]): void =>
  setStorageItem("admin_industries", industries);

export const getServices = (): Service[] => getStorageItem("admin_services", INITIAL_SERVICES);
export const saveServices = (services: Service[]): void =>
  setStorageItem("admin_services", services);

export const getStaff = (): StaffMember[] => getStorageItem("admin_staff", INITIAL_STAFF);
export const saveStaff = (staff: StaffMember[]): void => setStorageItem("admin_staff", staff);

export const getRoles = (): RolePermissions[] => getStorageItem("admin_roles", INITIAL_ROLES);
export const saveRoles = (roles: RolePermissions[]): void => setStorageItem("admin_roles", roles);

export const getQueries = (): ContactQuery[] => getStorageItem("admin_queries", INITIAL_QUERIES);
export const saveQueries = (queries: ContactQuery[]): void =>
  setStorageItem("admin_queries", queries);

export const getSettings = (): SystemSettings => getStorageItem("admin_settings", INITIAL_SETTINGS);
export const saveSettings = (settings: SystemSettings): void =>
  setStorageItem("admin_settings", settings);

export const getProjects = (): Project[] => getStorageItem("admin_projects", INITIAL_PROJECTS);
export const saveProjects = (projects: Project[]): void =>
  setStorageItem("admin_projects", projects);

export const INITIAL_ABOUT: About = {
  id: "about-singleton",
  title: "Engineering High-Performance",
  subtitle: "Software",
  description:
    "Elevix Technologies is a specialized software engineering studio building performant digital tools, secure enterprise portals, and bespoke AI applications.",
  missionTitle: "Our Core Mission",
  missionPoints: [
    "We believe that software should fit your business operations perfectly, rather than forcing you to adjust your workflows to generic template solutions.",
    "Our focus remains squarely on software architecture, clean state management, security boundaries, and responsive interfaces that load instantly across all form factors.",
    "We deliver our work as fast as possible with high-quality code, utilizing industry-standard methods and agile development practices.",
  ],
  stats: [
    { value: "150+", label: "Projects Delivered" },
    { value: "50+", label: "Active Clients" },
    { value: "5+", label: "Years of Operations" },
    { value: "99%", label: "Client Retention" },
  ],
  values: [
    {
      title: "Performance First",
      desc: "We measure system speeds in milliseconds and page loading times in sub-seconds. Speed directly impacts conversions and business efficiency.",
      icon: "Zap",
    },
    {
      title: "Secure-by-Design",
      desc: "From strict role-based access controls to encrypted file handling, data integrity and compliance form the baseline of every architecture we deploy.",
      icon: "Shield",
    },
    {
      title: "Client-Centric Collaboration",
      desc: "We act as your technical engineering partners, translating business operations directly into custom, maintainable digital platforms.",
      icon: "Heart",
    },
    {
      title: "Rapid & Reliable Delivery",
      desc: "We deliver your projects as fast as possible using industry-standard methodologies and high-quality, maintainable code.",
      icon: "Target",
    },
  ],
  ctaTitle: "Want to Collaborate with Us?",
  ctaDescription: "Let's build software that makes your business operations run automatically.",
};

export const getAboutInfo = (): About => getStorageItem("admin_about", INITIAL_ABOUT);
export const saveAboutInfo = (about: About): void => setStorageItem("admin_about", about);
