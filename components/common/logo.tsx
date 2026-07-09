import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Deep tech gradients matching the premium aesthetic */}
        <linearGradient id="elevix-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--indigo-400)" />
          <stop offset="100%" stopColor="var(--indigo-700)" />
        </linearGradient>
        <linearGradient id="elevix-accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--cyan-400)" />
          <stop offset="100%" stopColor="var(--indigo-600)" />
        </linearGradient>
        <linearGradient id="elevix-glow" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--indigo-500)" />
          <stop offset="100%" stopColor="var(--cyan-300)" />
        </linearGradient>
      </defs>

      {/* Slanted spine on the left */}
      <polygon points="25,20 40,20 30,80 15,80" fill="url(#elevix-primary)" />

      {/* Top Bar of the "E" */}
      <polygon points="40,20 80,20 75,35 37,35" fill="url(#elevix-glow)" />

      {/* Middle Bar of the "E" */}
      <polygon points="35,47 70,47 65,60 32,60" fill="url(#elevix-accent)" opacity="0.9" />

      {/* Bottom Bar of the "E" */}
      <polygon points="30,72 80,72 75,85 25,85" fill="url(#elevix-primary)" opacity="0.8" />
    </svg>
  );
}
