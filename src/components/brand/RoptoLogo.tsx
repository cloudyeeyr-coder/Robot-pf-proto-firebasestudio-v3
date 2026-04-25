
"use client"

import { cn } from "@/lib/utils";

interface RoptoLogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function RoptoLogo({ className, iconOnly = false }: RoptoLogoProps) {
  return (
    <div className={cn("flex items-center gap-4 group cursor-pointer", className)}>
      {/* CI Symbol: AI + Robotics Convergence */}
      <div className="relative h-12 w-12">
        {/* Ambient Glow Background */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-700" />
        
        {/* Outer Robotic Structure (Hexagon Frame) */}
        <div className="absolute inset-0 border border-white/20 rounded-lg skew-x-[-12deg] group-hover:rotate-45 transition-transform duration-1000" />
        
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-full w-full p-1.5 relative z-10"
        >
          {/* AI Neural Core */}
          <circle 
            cx="20" cy="20" r="4" 
            className="fill-primary animate-pulse" 
            style={{ filter: 'drop-shadow(0 0 8px var(--primary))' }}
          />
          
          {/* Synaptic Connections (AI Nodes) */}
          <path 
            d="M20 12V8M20 32V28M12 20H8M32 20H28M25.6 14.4L28.5 11.5M14.4 25.6L11.5 28.5M25.6 25.6L28.5 28.5M14.4 14.4L11.5 11.5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round"
            className="text-white/40 group-hover:text-primary transition-colors duration-500"
          />
          
          {/* Robotic Precision Frame (Inner) */}
          <path 
            d="M10 12L20 6L30 12V28L20 34L10 28V12Z" 
            stroke="url(#logo-gradient)" 
            strokeWidth="2"
            strokeDasharray="4 2"
            className="group-hover:stroke-dashoffset-10 transition-all duration-1000"
          />
          
          <defs>
            <linearGradient id="logo-gradient" x1="10" y1="6" x2="30" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#0066FF" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Accent Dots */}
        <div className="absolute -top-1 -right-1 h-1.5 w-1.5 bg-secondary rounded-full animate-ping" />
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-white tracking-tighter uppercase italic group-hover:text-glow transition-all">
              ROPTO
            </span>
            <div className="h-1 w-1 bg-primary rounded-full" />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[8px] font-bold text-primary tracking-[0.5em] uppercase">
              Neural Robotics
            </span>
            <div className="h-[1px] w-8 bg-white/10" />
          </div>
        </div>
      )}
    </div>
  );
}
