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
} from "@/features/admin/types";

export const INITIAL_JOBS: Job[] = [];

export const INITIAL_STAFF: StaffMember[] = [];

export const INITIAL_ROLES: RolePermissions[] = [];

export const INITIAL_SERVICES: Service[] = [];

export const INITIAL_INDUSTRIES: Industry[] = [];

export const INITIAL_QUERIES: ContactQuery[] = [];

export const INITIAL_FEEDBACK: FeedbackItem[] = [];

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

export const INITIAL_ABOUT_INFO: About = {
  id: "about-1",
  title: "Elevix Technologies",
  subtitle: "",
  description: "",
  missionTitle: "",
  missionPoints: [],
  stats: [],
  values: [],
  ctaTitle: "",
  ctaDescription: "",
};

export const INITIAL_PROJECTS: Project[] = [];
