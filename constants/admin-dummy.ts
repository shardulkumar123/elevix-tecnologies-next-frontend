import {
  ContactQuery,
  Industry,
  Job,
  Project,
  RolePermissions,
  Service,
  StaffMember,
  SystemSettings,
} from "@/features/admin/types";

export const INITIAL_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Senior Full Stack Engineer (Next.js & NestJS)",
    department: "Engineering",
    location: "San Francisco, CA",
    locationType: "Hybrid",
    type: "Full-time",
    salaryRange: "$130,000 - $160,000",
    description:
      "We are looking for a Senior Full Stack Engineer to lead development on our core web applications using Next.js and NestJS. You will be responsible for defining technical layouts, optimizing load times, and ensuring high security standards.",
    requirements: [
      "5+ years of experience with React/Next.js and Node.js/NestJS",
      "Strong understanding of database design (Prisma, PostgreSQL)",
      "Experience setting up CI/CD pipelines and Docker containers",
      "Excellent communication and collaboration skills",
    ],
    benefits: [
      "Competitive salary and equity packages",
      "Flexible hybrid working options",
      "Premium health, dental, and vision coverages",
      "Learning and development stipend of $2,00,000/year",
    ],
    status: "Active",
    createdAt: "2026-05-10T10:00:00Z",
  },
  {
    id: "job-2",
    title: "AI & Machine Learning Engineer",
    department: "AI Research",
    location: "Remote (US/Europe)",
    locationType: "Remote",
    type: "Full-time",
    salaryRange: "$140,000 - $180,000",
    description:
      "Help build the next generation of generative AI products and integrations. You will work on fine-tuning large language models, developing agent architectures, and integrating models into production web applications.",
    requirements: [
      "Deep understanding of Transformer models, LLM architectures, and RAG pipelines",
      "Python mastery, experience with PyTorch, LangChain, or LlamaIndex",
      "Experience deploying AI models to cloud platforms (AWS, GCP)",
      "MS or PhD in Computer Science, Mathematics, or related field is a plus",
    ],
    benefits: [
      "Work from anywhere in the world",
      "Unlimited PTO",
      "Latest Apple equipment budget",
      "Annual company retreats",
    ],
    status: "Active",
    createdAt: "2026-06-01T09:30:00Z",
  },
  {
    id: "job-3",
    title: "Junior Backend Developer",
    department: "Engineering",
    location: "Noida, India",
    locationType: "Onsite",
    type: "Full-time",
    salaryRange: "₹8,00,000 - ₹12,00,000",
    description:
      "Join our backend engineering team to help maintain and scale API microservices. You will work closely with senior engineers to design RESTful endpoints, improve query optimization, and write automated tests.",
    requirements: [
      "1-3 years of backend development experience with TypeScript or Go",
      "Familiarity with SQL and NoSQL databases",
      "Basic understanding of Git and containerization",
      "Proactive attitude and eager to learn",
    ],
    benefits: [
      "Mentorship from senior engineers",
      "Free catered daily lunch",
      "Comprehensive health insurance",
      "Performance-based bonuses",
    ],
    status: "Draft",
    createdAt: "2026-06-10T14:00:00Z",
  },
];

export const INITIAL_INDUSTRIES: Industry[] = [
  {
    id: "restaurants",
    name: "Restaurants",
    slug: "restaurants",
    description:
      "POS, table ordering, kitchen display, delivery integration, and loyalty programs.",
    icon: "Utensils",
    status: "Active",
    createdAt: "2026-01-15T08:00:00Z",
    tagline: "Hospitality",
    color: "from-orange-500 to-red-500",
    stats: { value: "30%", label: "Increase in table turnover" },
    solutions: [
      "Point of Sale (POS) Systems",
      "Contactless Table Ordering",
      "Kitchen Display Systems (KDS)",
      "Delivery Platform Integrations",
      "Customer Loyalty Programs",
    ],
  },
  {
    id: "hotels",
    name: "Hotels",
    slug: "hotels",
    description: "Booking engines, front desk systems, housekeeping apps, and guest portals.",
    icon: "BedDouble",
    status: "Active",
    createdAt: "2026-02-20T11:30:00Z",
    tagline: "Hospitality",
    color: "from-blue-500 to-cyan-500",
    stats: { value: "45%", label: "Direct booking growth" },
    solutions: [
      "Direct Booking Engines",
      "Front Desk Management Systems",
      "Housekeeping Coordination Apps",
      "Interactive Guest Portals",
      "Channel Manager Integrations",
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    slug: "manufacturing",
    description:
      "Production tracking, quality control, shift management, and supply chain dashboards.",
    icon: "Factory",
    status: "Active",
    createdAt: "2026-03-05T15:45:00Z",
    tagline: "Enterprise",
    color: "from-slate-600 to-gray-800",
    stats: { value: "20%", label: "Reduction in cycle times" },
    solutions: [
      "Real-Time Production Tracking",
      "Automated Quality Control",
      "Shift & Personnel Management",
      "Supply Chain Telemetry Dashboards",
      "IoT Machine Integrations",
    ],
  },
  {
    id: "inventory-systems",
    name: "Inventory Systems",
    slug: "inventory-systems",
    description:
      "Real-time stock management, barcode scanning, reorder alerts, and supplier portals.",
    icon: "Package",
    status: "Active",
    createdAt: "2026-04-10T10:00:00Z",
    tagline: "Operations",
    color: "from-yellow-500 to-amber-600",
    stats: { value: "99.9%", label: "Stock tracking accuracy" },
    solutions: [
      "Real-time Stock Level Tracking",
      "Mobile Barcode & QR Scanning",
      "Automated Reorder Trigger Alerts",
      "Supplier Collaborative Portals",
      "Warehouse Bin Management",
    ],
  },
  {
    id: "booking-platforms",
    name: "Booking Platforms",
    slug: "booking-platforms",
    description: "Appointment scheduling, resource booking, calendar sync, and customer reminders.",
    icon: "Calendar",
    status: "Active",
    createdAt: "2026-05-01T09:00:00Z",
    tagline: "Service",
    color: "from-emerald-500 to-teal-600",
    stats: { value: "50%", label: "Fewer appointment no-shows" },
    solutions: [
      "Self-Service Appointment Scheduling",
      "Resource & Equipment Booking",
      "Two-Way Calendar Sync",
      "Automated SMS & Email Reminders",
      "Client Check-In Management",
    ],
  },
  {
    id: "business-automation",
    name: "Business Automation",
    slug: "business-automation",
    description: "Workflow automation, data pipelines, API integrations, and process digitization.",
    icon: "Workflow",
    status: "Active",
    createdAt: "2026-05-15T12:00:00Z",
    tagline: "Enterprise",
    color: "from-purple-500 to-indigo-600",
    stats: { value: "10x", label: "Faster processing times" },
    solutions: [
      "No-Code & Low-Code Workflow Automation",
      "Secure Data Pipelines & ETL",
      "Custom API Integrations",
      "Legacy Process Digitization",
      "Automated Document Approvals",
    ],
  },
  {
    id: "e-commerce",
    name: "E-Commerce",
    slug: "e-commerce",
    description: "B2C and B2B online stores with catalog management, payments, and logistics.",
    icon: "ShoppingBag",
    status: "Active",
    createdAt: "2026-06-01T08:00:00Z",
    tagline: "Retail",
    color: "from-rose-500 to-pink-600",
    stats: { value: "3.2s", label: "Average load time" },
    solutions: [
      "Headless B2C/B2B Storefronts",
      "Dynamic Product Catalog Engines",
      "Multi-Gateway Payment Rails",
      "Automated Shipping & Logistics Integration",
      "Tailored Discount & Coupon Systems",
    ],
  },
  {
    id: "custom-portals",
    name: "Custom Portals",
    slug: "custom-portals",
    description: "Partner portals, employee intranets, client dashboards, and reporting platforms.",
    icon: "LayoutDashboard",
    status: "Active",
    createdAt: "2026-06-10T14:30:00Z",
    tagline: "Enterprise",
    color: "from-cyan-500 to-blue-600",
    stats: { value: "98%", label: "User adoption rate" },
    solutions: [
      "Vendor & Partner Collaboration Portals",
      "Employee Intranets & Resource Centers",
      "Personalized Customer Dashboards",
      "Aggregated Business Reporting Panels",
      "Strict Role-Based Access Control (RBAC)",
    ],
  },
  {
    id: "travel",
    name: "Travel & Tourism",
    slug: "travel",
    description:
      "Custom flight/hotel booking engines, GDS integrations, itinerary builders, and agent portals.",
    icon: "Plane",
    status: "Active",
    createdAt: "2026-06-20T10:00:00Z",
    tagline: "Operations",
    color: "from-blue-600 to-teal-500",
    stats: { value: "40%", label: "Booking flow automation" },
    solutions: [
      "GDS API Integrations (Amadeus/Sabre)",
      "B2B/B2C Booking Engines",
      "Custom Itinerary Planners",
      "Payment Gateway & Ledger Rails",
      "Agent Commission Management",
    ],
  },
  {
    id: "custom-software",
    name: "Custom Software & Websites",
    slug: "custom-software",
    description:
      "Tailor-made web applications, bespoke CMS integrations, responsive websites, and enterprise systems.",
    icon: "Code2",
    status: "Active",
    createdAt: "2026-06-22T10:00:00Z",
    tagline: "Engineering",
    color: "from-indigo-500 to-purple-600",
    stats: { value: "100%", label: "Bespoke custom solutions" },
    solutions: [
      "Responsive Next.js Frontend Websites",
      "Scalable NestJS Backend APIs",
      "Bespoke Content Management (CMS)",
      "Enterprise System Architectures",
      "Third-Party API Integrations",
    ],
  },
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: "srv-1",
    name: "Hotel Management & Booking",
    description:
      "Robust Property Management Systems (PMS) and customized direct booking engines that reduce OTA commissions.",
    features: [
      "Channel Manager Integrations",
      "Interactive Room & Floor Plans",
      "Mobile Check-in & Digital Keys",
      "Automated Guest Communication",
    ],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    status: "Active",
    createdAt: "2026-01-10T09:00:00Z",
  },
  {
    id: "srv-2",
    name: "Custom E-Commerce Platforms",
    description:
      "High-performance online storefronts built with headless architectures for blazing-fast speed and seamless checkout experiences.",
    features: [
      "Headless CMS Integrations",
      "Real-Time Inventory Sync",
      "Multi-Currency & Tax Automation",
      "One-Click Checkout & Apple Pay",
    ],
    technologies: ["Next.js", "Shopify GraphQL", "TailwindCSS"],
    status: "Active",
    createdAt: "2026-03-01T10:00:00Z",
  },
  {
    id: "srv-3",
    name: "HIPAA-Compliant Telehealth Portals",
    description:
      "Secure, reliable, and user-friendly digital health platforms facilitating virtual consultations and clinical records access.",
    features: [
      "Secure Video Consultations",
      "Prescription Routing Systems",
      "Patient Records Management",
      "Automated Appointment Scheduling",
    ],
    technologies: ["React", "WebRTC", "Express", "MongoDB"],
    status: "Active",
    createdAt: "2026-04-12T16:20:00Z",
  },
  {
    id: "srv-4",
    name: "Custom Payment & Ledger Solutions",
    description:
      "Scalable ledger databases, payment gateways, and fraud detection layers supporting multi-tenant financial applications.",
    features: [
      "PCI-DSS Compliant Gateways",
      "Automated Reconciliation Engines",
      "Real-Time Fraud Monitoring",
      "Multi-Tier Fee Calculations",
    ],
    technologies: ["NestJS", "PostgreSQL", "Stripe API"],
    status: "Active",
    createdAt: "2026-05-01T08:00:00Z",
  },
  {
    id: "srv-5",
    name: "Real-Time Analytics Dashboards",
    description:
      "Interactive, data-rich reporting panels that aggregate telemetry, system health metrics, and business intelligence.",
    features: [
      "Interactive Charting & Reports",
      "Multi-Source Data Aggregation",
      "Customizable Alert Thresholds",
      "Export to PDF, CSV, and Excel",
    ],
    technologies: ["Next.js", "GraphQL", "D3.js", "InfluxDB"],
    status: "Active",
    createdAt: "2026-05-15T09:00:00Z",
  },
  {
    id: "srv-6",
    name: "Cloud Migration & DevOps Automation",
    description:
      "Secure cloud migrations, automated CI/CD pipelines, and Infrastructure-as-Code setups to scale operations seamlessly.",
    features: [
      "Infrastructure as Code (Terraform)",
      "Zero-Downtime Docker/K8s Setups",
      "Multi-Region Load Balancing",
      "Cost Optimization Auditing",
    ],
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    status: "Active",
    createdAt: "2026-06-01T10:00:00Z",
  },
  {
    id: "srv-7",
    name: "Dedicated Maintenance & SLA Support",
    description:
      "Proactive monitoring, routine data backups, security audits, and continuous performance optimization.",
    features: [
      "24/7 System Health Monitoring",
      "Automated Daily Database Backups",
      "Vulnerability & Patch Auditing",
      "Guaranteed SLA Resolution Times",
    ],
    technologies: ["Grafana", "Prometheus", "Sentry", "AWS CloudWatch"],
    status: "Active",
    createdAt: "2026-06-10T12:00:00Z",
  },
  {
    id: "srv-8",
    name: "UX Redesign & Web Modernization",
    description:
      "Transform outdated web portals into fast, responsive, and search-optimized Next.js web applications.",
    features: [
      "Modern Component-Driven Design",
      "Mobile-Responsive UX Auditing",
      "SEO Schema & Meta Optimization",
      "Sub-Second Page Load Optimization",
    ],
    technologies: ["Next.js", "Redux Toolkit", "Tailwind CSS", "Framer Motion"],
    status: "Active",
    createdAt: "2026-06-15T14:00:00Z",
  },
  {
    id: "srv-9",
    name: "Travel Booking Engines & GDS Integration",
    description:
      "Tailor-made flight, hotel, and holiday package booking engines with direct GDS and third-party travel API integrations.",
    features: [
      "Amadeus & Sabre GDS Integrations",
      "Dynamic Itinerary Builders",
      "Multi-currency Payment Rails",
      "Agent & Customer Dashboards",
    ],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Amadeus API"],
    status: "Active",
    createdAt: "2026-06-20T10:00:00Z",
  },
  {
    id: "srv-10",
    name: "Bespoke Web & Custom Software Development",
    description:
      "Custom-tailored Next.js frontend applications, performant Node.js backends, and responsive corporate websites engineered to automate your business.",
    features: [
      "Next.js & React Frontend Webapps",
      "NestJS & Express Backend APIs",
      "Custom CMS & Headless Integrations",
      "Search Engine & Core Web Vitals Optimization",
    ],
    technologies: ["Next.js", "NestJS", "TypeScript", "Tailwind CSS"],
    status: "Active",
    createdAt: "2026-06-22T10:00:00Z",
  },
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: "staff-1",
    name: "Aditya Vardhan",
    email: "aditya@elevixtechnologies.com",
    role: "Super Admin",
    status: "Active",
    joinedDate: "2024-01-10",
  },
  {
    id: "staff-2",
    name: "Neha Sharma",
    email: "neha.s@elevixtechnologies.com",
    role: "Editor",
    status: "Active",
    joinedDate: "2025-03-15",
  },
  {
    id: "staff-3",
    name: "Shardul Kumar",
    email: "shardul@elevixtechnologies.com",
    role: "Super Admin",
    status: "Active",
    joinedDate: "2024-06-20",
  },
  {
    id: "staff-4",
    name: "Rohan Verma",
    email: "rohan.v@elevixtechnologies.com",
    role: "Recruiter",
    status: "Active",
    joinedDate: "2025-11-01",
  },
];

export const INITIAL_ROLES: RolePermissions[] = [
  {
    role: "Super Admin",
    permissions: {
      jobs: { read: true, write: true, delete: true },
      industries: { read: true, write: true, delete: true },
      services: { read: true, write: true, delete: true },
      staff: { read: true, write: true, delete: true },
      queries: { read: true, write: true, delete: true },
      settings: { read: true, write: true, delete: true },
    },
  },
  {
    role: "Editor",
    permissions: {
      jobs: { read: true, write: true, delete: false },
      industries: { read: true, write: true, delete: false },
      services: { read: true, write: true, delete: false },
      staff: { read: true, write: false, delete: false },
      queries: { read: true, write: true, delete: false },
      settings: { read: true, write: false, delete: false },
    },
  },
  {
    role: "Recruiter",
    permissions: {
      jobs: { read: true, write: true, delete: false },
      industries: { read: true, write: false, delete: false },
      services: { read: true, write: false, delete: false },
      staff: { read: false, write: false, delete: false },
      queries: { read: false, write: false, delete: false },
      settings: { read: false, write: false, delete: false },
    },
  },
];

export const INITIAL_QUERIES: ContactQuery[] = [
  {
    id: "query-1",
    name: "Rajesh Khandelwal",
    email: "rajesh@khandelwalretail.in",
    phone: "+91 98765 43210",
    company: "Khandelwal Retail Group",
    serviceInterest: "Custom Enterprise Portal Development",
    message:
      "Hello team, we are looking to replace our legacy inventory tracking spreadsheet with a modern internal portal. It needs to support role permissions for warehouse staff vs managers. Can you provide a cost estimate?",
    status: "New",
    createdAt: "2026-06-11T09:15:00Z",
  },
  {
    id: "query-2",
    name: "Sarah Jenkins",
    email: "s.jenkins@healthcarecorp.com",
    phone: "+1 (555) 019-2834",
    company: "Global Healthcare Corp",
    serviceInterest: "AI & Large Language Model Integrations",
    message:
      "We need to set up a secure RAG search engine inside our local network to search through patient treatment manuals. HIPAA compliance is an absolute requirement. Let's schedule a call this Friday.",
    status: "Replied",
    replyMessage:
      "Hi Sarah, thank you for reaching out. Yes, we are highly experienced with HIPAA-compliant setups. Let's schedule a Zoom call this Friday. I'll send an invite.",
    createdAt: "2026-06-10T16:40:00Z",
  },
  {
    id: "query-3",
    name: "Vikram Malhotra",
    email: "vikram@fintechventures.io",
    company: "Fintech Ventures",
    serviceInterest: "Cloud Systems Consulting & Security Auditing",
    message:
      "We are preparing for a Series A audit next month. We need an external audit on our AWS infrastructure, security groups, and encryption-at-rest policies.",
    status: "Resolved",
    replyMessage:
      "Hi Vikram, we can help audit your AWS environment and provide a remediation plan within 5 business days. Let's hop on a call to review your current configuration.",
    createdAt: "2026-06-08T11:22:00Z",
  },
];

export const INITIAL_SETTINGS: SystemSettings = {
  siteName: "Elevix Technologies Portal",
  siteEmail: "admin@elevixtechnologies.com",
  contactPhone: "+91 98765 43210",
  address: "Sector 62, Noida, Uttar Pradesh, India",
  maintenanceMode: false,
  allowPublicApplications: true,
  maxUploadSizeMb: 15,
  supportHours: "Mon - Fri: 9:00 AM - 6:00 PM IST",
  privacyPolicy: `# Privacy Policy
 
Effective Date: June 17, 2026
 
At Elevix Technologies, we value your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
 
## 1. Information We Collect
We collect information that you voluntarily provide to us when submitting inquiries, requesting consultations, or applying for jobs. This may include your name, email address, phone number, company name, and resume.
 
## 2. How We Use Your Information
We use the collected information to respond to your queries, process job applications, and improve our services. We do not sell or lease your personal information to third parties.
 
## 3. Contact Us
If you have any questions about this privacy policy, please contact us at support@elevixtechnologies.com.`,
  termsOfService: `# Terms of Service
 
Last Updated: June 17, 2026
 
Welcome to Elevix Technologies. By accessing or using our services, you agree to comply with and be bound by the following terms of service.
 
## 1. Acceptable Use
You agree to use our portal and services only for lawful purposes. You must not use our services to distribute harmful or malicious code, or engage in unauthorized access.
 
## 2. Intellectual Property
All code, designs, graphics, and content on this portal are the intellectual property of Elevix Technologies Inc. and may not be reproduced without prior written consent.
 
## 3. Disclaimers
Our services are provided on an "as-is" and "as-available" basis. We make no warranties regarding uninterrupted or error-free operations.`,
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Justravels Booking Engine",
    category: "Web Apps",
    desc: "A highly-scalable Nest.js and Next.js booking infrastructure built for rapid seat allocation and automated platform dues calculations.",
    longDesc:
      "Justravels required a complete modernization of their central booking system. We re-engineered their booking pipeline using a microservices-based Nest.js architecture, caching high-volume lookups with Redis, and integrating real-time ledger accounting.",
    stats: "2.5M+ requests/day",
    techStack: ["Next.js", "Nest.js", "Redis", "PostgreSQL", "Docker"],
    color: "from-blue-500 to-indigo-500",
    createdAt: "2026-04-01T12:00:00Z",
  },
  {
    id: "project-2",
    title: "Aegis AI Agent",
    category: "AI/ML",
    desc: "A context-aware developer assistant capable of scanning directory contexts and suggesting secure edits via structured tool calls.",
    longDesc:
      "Aegis AI scans large-scale codebases to automatically fix syntax warnings, resolve type mismatches, and format output. It executes actions in sandboxed environments with precise feedback loops.",
    stats: "99.8% precision",
    techStack: ["TypeScript", "Python", "OpenAI API", "LangChain", "VectorDB"],
    color: "from-purple-500 to-pink-500",
    createdAt: "2026-05-15T09:30:00Z",
  },
  {
    id: "project-3",
    title: "Vatsalya Portal",
    category: "Web Apps",
    desc: "A secure state welfare portal ensuring reliable distribution workflows, supporting encrypted PDF/TIFF uploads and strict compliance audits.",
    longDesc:
      "Vatsalya provides a unified portal for citizen benefits distribution. We implemented robust verification checkpoints, secure cloud storage with pre-signed URLs, and high-performance server side rendering.",
    stats: "500k+ active users",
    techStack: ["React", "Express.js", "AWS S3", "Tailwind CSS", "Jest"],
    color: "from-emerald-500 to-teal-500",
    createdAt: "2026-06-01T14:15:00Z",
  },
  {
    id: "project-4",
    title: "ElevixStream Edge Cache",
    category: "Cloud API",
    desc: "Custom edge routing middleware designed to optimize dynamic API requests and reduce database stress under extreme load spikes.",
    longDesc:
      "Built for dynamic e-commerce catalog API loads, ElevixStream caches complex database query results at the network edge, ensuring sub-15ms response latencies and seamless auto-scaling.",
    stats: "15ms avg latency",
    techStack: ["Go", "Cloudflare Workers", "gRPC", "Redis Enterprise"],
    color: "from-amber-500 to-orange-500",
    createdAt: "2026-06-10T10:00:00Z",
  },
  {
    id: "project-5",
    title: "Cloud Infrastructure & DevOps Pipeline",
    category: "Cloud",
    desc: "Automating cloud deployments and scaling multi-region architectures with Docker, Kubernetes, and Terraform.",
    longDesc:
      "We built a zero-downtime CI/CD deployment flow for a high-volume fintech client. We provisioned secure VPC boundaries, auto-scaling Kubernetes clusters, and isolated staging environments, cutting hosting costs by 35%.",
    stats: "35% cost reduction",
    techStack: ["AWS", "Terraform", "Kubernetes", "Docker", "GitHub Actions"],
    color: "from-cyan-500 to-blue-500",
    createdAt: "2026-06-12T10:00:00Z",
  },
  {
    id: "project-6",
    title: "24/7 SLA Maintenance & Server Management",
    category: "Maintenance",
    desc: "Ongoing performance monitoring, regular database backups, vulnerability patching, and sub-second scaling audits.",
    longDesc:
      "We provide dedicated round-the-clock maintenance SLA for large scale retail stores, running automated security patch updates, database replication checks, and immediate response logs for server bottlenecks.",
    stats: "99.99% uptime SLA",
    techStack: ["Grafana", "Prometheus", "Redis", "AWS CloudWatch", "PostgreSQL"],
    color: "from-slate-500 to-slate-700",
    createdAt: "2026-06-15T10:00:00Z",
  },
  {
    id: "project-7",
    title: "Legacy ERP Portal Redesign",
    category: "Redesign",
    desc: "Complete frontend modernization, transforming a slow legacy portal into a high-performance Next.js application.",
    longDesc:
      "We rebuilt a slow portal into a modern dashboard. We restructured the user flow, integrated Tailwind CSS for modular layouts, and implemented client-side state caching with Redux, boosting performance by 3x.",
    stats: "3x performance boost",
    techStack: ["Next.js", "Redux Toolkit", "Tailwind CSS", "Framer Motion", "TypeScript"],
    color: "from-purple-500 to-indigo-500",
    createdAt: "2026-06-18T12:00:00Z",
  },
];
