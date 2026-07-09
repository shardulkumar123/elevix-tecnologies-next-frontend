import type { Metadata } from "next";

import { AdminLayoutWrapper } from "@/features/admin/components/admin-layout-wrapper";

import { AuthProvider } from "@/features/auth/context/auth-context";

export const metadata: Metadata = {
  title: "Admin Portal | Hopes Technologies",
  description:
    "Secure administrative dashboard to coordinate jobs, industries, services, staff members, queries, and system properties.",
};

export default function AdminRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
    </AuthProvider>
  );
}
