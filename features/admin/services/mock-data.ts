import {
  About,
  ContactQuery,
  FeedbackItem,
  Industry,
  Job,
  Project,
  RolePermissions,
  Service,
  StaffMember,
  SystemSettings,
} from "../types";

export const INITIAL_SETTINGS: SystemSettings = {
  siteName: "Elevix Technologies",
  siteEmail: "",
  contactPhone: "",
  address: "",
  maintenanceMode: false,
  allowPublicApplications: true,
  maxUploadSizeMb: 10,
  supportHours: "",
  privacyPolicy: "",
  termsOfService: "",
};

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

export const getJobs = (): Job[] => getStorageItem("admin_jobs", []);
export const saveJobs = (jobs: Job[]): void => setStorageItem("admin_jobs", jobs);

export const getIndustries = (): Industry[] => getStorageItem("admin_industries", []);
export const saveIndustries = (industries: Industry[]): void =>
  setStorageItem("admin_industries", industries);

export const getServices = (): Service[] => getStorageItem("admin_services", []);
export const saveServices = (services: Service[]): void =>
  setStorageItem("admin_services", services);

export const getStaff = (): StaffMember[] => getStorageItem("admin_staff", []);
export const saveStaff = (staff: StaffMember[]): void => setStorageItem("admin_staff", staff);

export const getRoles = (): RolePermissions[] => getStorageItem("admin_roles", []);
export const saveRoles = (roles: RolePermissions[]): void => setStorageItem("admin_roles", roles);

export const getQueries = (): ContactQuery[] => getStorageItem("admin_queries", []);
export const saveQueries = (queries: ContactQuery[]): void =>
  setStorageItem("admin_queries", queries);

export const getFeedback = (): FeedbackItem[] => getStorageItem("admin_feedback", []);
export const saveFeedback = (feedback: FeedbackItem[]): void =>
  setStorageItem("admin_feedback", feedback);

export const getSettings = (): SystemSettings => getStorageItem("admin_settings", INITIAL_SETTINGS);
export const saveSettings = (settings: SystemSettings): void =>
  setStorageItem("admin_settings", settings);

export const getProjects = (): Project[] => getStorageItem("admin_projects", []);
export const saveProjects = (projects: Project[]): void =>
  setStorageItem("admin_projects", projects);

export const EMPTY_ABOUT: About = {
  id: "about-singleton",
  title: "",
  subtitle: "",
  description: "",
  missionTitle: "",
  missionPoints: [],
  stats: [],
  values: [],
  ctaTitle: "",
  ctaDescription: "",
};

export const getAboutInfo = (): About => getStorageItem("admin_about", EMPTY_ABOUT);
export const saveAboutInfo = (about: About): void => setStorageItem("admin_about", about);
