"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Target launch date: 15 days from now
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 12,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    // Set fixed target date: 15 days from now for demonstration
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setMessage("Thank you! You've been added to our early access list.");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-between bg-[#030014] text-slate-100 overflow-hidden font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* 1. ATMOSPHERIC BACKGROUND EFFECTS */}
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />

      {/* Radial Neon Glows */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] left-[40%] h-[350px] w-[350px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      {/* 2. HEADER */}
      <header className="relative z-10 w-full px-6 py-6 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              ELEVIX
            </span>
          </div>
        </div>
      </header>

      {/* 3. MAIN HERO CONTENT */}
      <main className="relative z-10 my-auto flex flex-col items-center px-6 py-12 text-center md:px-12">
        <div className="mx-auto max-w-4xl space-y-8 md:space-y-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-950/50 border border-indigo-500/30 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-indigo-300 backdrop-blur-sm shadow-[0_0_15px_rgba(99,102,241,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <Sparkles className="h-3 w-3 inline text-indigo-400 mr-0.5" /> Launching Soon
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight">
            Crafting the Future of{" "}
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-black">
              Enterprise Software
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-base md:text-lg text-slate-400 leading-relaxed">
            Elevix Technologies is building next-generation digital platforms, business automation systems,
            and custom portals that empower businesses to scale effortlessly.
          </p>

          {/* Countdown Clock */}
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto md:max-w-xl md:gap-6">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-3 md:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
              >
                <span className="text-2xl font-black md:text-5xl bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mt-1 md:text-xs">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Signup Form */}
          <div className="mx-auto max-w-md w-full">
            {status === "success" ? (
              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-6 flex flex-col items-center space-y-3 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                <p className="text-sm font-medium text-emerald-300">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative flex flex-col sm:flex-row items-center gap-2.5 p-1.5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] focus-within:border-indigo-500/50 transition-all duration-300 w-full">
                  <div className="relative flex-1 w-full pl-3 flex items-center">
                    <Mail className="h-5 w-5 text-slate-500 flex-shrink-0" />
                    <input
                      type="email"
                      placeholder="Enter your work email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      className="w-full bg-transparent pl-2.5 py-3 text-sm text-white placeholder-slate-500 outline-none disabled:opacity-50"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto rounded-xl px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-70 transition-all duration-200"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      <>
                        Notify Me
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-rose-400 text-xs px-2 justify-center">
                    <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{message}</span>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </main>

      {/* 4. FOOTER */}
      <footer className="relative z-10 w-full px-6 py-8 md:px-12 border-t border-white/[0.03]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row text-xs text-slate-500">
          <p>© 2026 Elevix Technologies. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link
              href="https://github.com"
              target="_blank"
              className="hover:text-slate-300 transition-colors"
              aria-label="GitHub"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="hover:text-slate-300 transition-colors"
              aria-label="Twitter"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-slate-300 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
