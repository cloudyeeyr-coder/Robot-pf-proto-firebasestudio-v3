
"use client"

import { cn } from "@/lib/utils";

interface RoptoLogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function RoptoLogo({ className, iconOnly = false }: RoptoLogoProps) {
  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      {/* CI Symbol: Hexagonal Geometric 'R' */}
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 bg-primary skew-x-[-12deg] group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(0,102,255,0.4)]" />
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-full w-full p-2 text-primary-foreground skew-x-[12deg] relative z-10"
        >
          <path 
            d="M12 2L20 6.5V17.5L12 22L4 17.5V6.5L12 2Z" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M9 16V8H12.5C13.8807 8 15 9.11929 15 10.5C15 11.8807 13.8807 13 12.5 13H9" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M12.5 13L15.5 16" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="0.5" fill="currentColor" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span className="text-2xl font-black text-white tracking-tighter uppercase italic">
            ROPTO
          </span>
          <span className="text-[7px] font-bold text-primary tracking-[0.4em] uppercase mt-0.5">
            Robotics Operations
          </span>
        </div>
      )}
    </div>
  );
}
