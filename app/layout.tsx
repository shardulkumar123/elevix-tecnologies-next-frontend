import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";

import { QueryProvider } from "@/components/providers/query-provider";
import { StoreProvider } from "@/components/providers/store-provider";
import { ThemeSyncProvider } from "@/components/providers/theme-sync-provider";
import { ToastProvider } from "@/components/ui/toast";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elevix Technologies | IT Services & Consulting",
  description:
    "Your digital transformation partner helping organizations establish and grow their online presence through custom Web Solutions, Business Software, and Digital Growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <StoreProvider>
          <ThemeSyncProvider>
            <QueryProvider>
              <ToastProvider>{children}</ToastProvider>
            </QueryProvider>
          </ThemeSyncProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
