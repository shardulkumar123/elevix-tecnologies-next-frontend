"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Moon, Sun } from "lucide-react";

import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { toggleTheme } from "@/lib/redux/slices/theme-slice";

export function Navbar() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const pathname = usePathname();

  const navItems = [
    // { name: "Products", href: "/products/travelerp" },
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Industries", href: "/industries" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand/Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <Logo height={80} />
          </Link>
        </div>

        {/* Center Navigation Menus */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-all duration-200 px-3.5 py-1.5 rounded-xl text-sm font-semibold ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-500/20"
                    : "text-muted-foreground hover:text-foreground border border-transparent"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle Theme"
            className="rounded-full relative w-9 h-9 flex items-center justify-center border border-border/40 hover:bg-muted"
          >
            {theme === "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500 transition-all duration-300" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:text-neutral-200 transition-all duration-300" />
            )}
          </Button>

          <Button
            size="sm"
            asChild
            className="rounded-xl px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all"
          >
            <Link href="/contact">Start a Project</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
