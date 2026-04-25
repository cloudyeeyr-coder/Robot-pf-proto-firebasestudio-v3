"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, LogOut, User, LayoutDashboard, Search, Cpu } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NotificationBell } from "./NotificationBell";
import { getSession, UserRole } from "@/lib/auth-mock";
import { cn } from "@/lib/utils";

const NAV_ITEMS: Record<UserRole, { label: string; href: string }[]> = {
  buyer: [
    { label: "PARTNERS", href: "/search" },
    { label: "CALCULATOR", href: "/calculator" },
    { label: "CONTRACTS", href: "/my/contracts" },
    { label: "MAINTENANCE", href: "/my/as-tickets" },
  ],
  si_partner: [
    { label: "PROFILE", href: "/partner/profile" },
    { label: "PROPOSALS", href: "/partner/proposals" },
    { label: "BADGES", href: "/partner/badges" },
  ],
  manufacturer: [
    { label: "DASHBOARD", href: "/manufacturer/dashboard" },
    { label: "CERTIFICATIONS", href: "/manufacturer/badges" },
    { label: "OFFERS", href: "/manufacturer/proposals" },
  ],
  admin: [
    { label: "ANALYTICS", href: "/admin" },
    { label: "ESCROW", href: "/admin/escrow" },
    { label: "SLA_REPORT", href: "/admin/as-sla" },
    { label: "DISPUTES", href: "/admin/disputes" },
  ],
};

export function Header() {
  const pathname = usePathname();
  const user = getSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = user ? NAV_ITEMS[user.role] : [];

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500",
      scrolled 
        ? "bg-background/60 backdrop-blur-xl border-b border-white/10 py-2 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
        : "bg-transparent py-6"
    )}>
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="h-8 w-8 bg-primary flex items-center justify-center skew-x-[-12deg] group-hover:scale-110 transition-transform">
              <Cpu className="h-5 w-5 text-primary-foreground skew-x-[12deg]" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase italic">
              ROPTO
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-10" aria-label="Main Navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[10px] font-black tracking-[0.2em] transition-all hover:text-primary",
                  pathname.startsWith(item.href) ? "text-primary" : "text-white/60"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex rounded-none border border-transparent hover:border-white/10">
            <Search className="h-5 w-5" />
          </Button>

          {user ? (
            <div className="flex items-center gap-4">
              <NotificationBell />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-none p-0 border border-white/10 hover:border-primary/50 transition-all">
                    <Avatar className="h-full w-full rounded-none">
                      <AvatarImage src={user.avatarUrl} alt={user.name} className="grayscale hover:grayscale-0 transition-all" />
                      <AvatarFallback className="rounded-none bg-muted">{user.name[0]}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 mt-4 p-4 rounded-none bg-card border-white/10 shadow-2xl" align="end">
                  <DropdownMenuLabel className="font-normal p-0 pb-4">
                    <div className="flex flex-col space-y-1">
                      <p className="text-xs font-black tracking-widest text-primary uppercase">{user.role.replace('_', ' ')}</p>
                      <p className="text-lg font-black leading-none">{user.name}</p>
                      <p className="text-[10px] leading-none text-muted-foreground mt-1">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <div className="py-2 space-y-1">
                    <DropdownMenuItem asChild className="rounded-none focus:bg-primary focus:text-primary-foreground">
                      <Link href="/my/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Profile Config</span>
                      </Link>
                    </DropdownMenuItem>
                    {user.role !== 'buyer' && (
                      <DropdownMenuItem asChild className="rounded-none focus:bg-primary focus:text-primary-foreground">
                        <Link href={`/${user.role}`}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span className="text-xs font-bold uppercase tracking-wider">Admin Dash</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </div>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-white rounded-none">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Disconnect</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden rounded-none border border-white/10">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[400px] bg-background/95 backdrop-blur-2xl border-l-white/10">
                  <div className="flex flex-col space-y-12 pt-16">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-primary tracking-[0.3em]">SYSTEM_NAVIGATION</p>
                      <div className="h-px w-full bg-white/10" />
                    </div>
                    <nav className="flex flex-col gap-6">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "text-4xl font-black tracking-tighter transition-all uppercase",
                            pathname.startsWith(item.href) ? "text-primary italic" : "text-white/40 hover:text-white"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Button variant="ghost" asChild className="text-[10px] font-black tracking-[0.2em] uppercase text-white/60 hover:text-white">
                <Link href="/login">LOGIN</Link>
              </Button>
              <Button className="rounded-none skew-x-[-12deg] bg-primary text-primary-foreground font-black px-6 hover:bg-primary/80">
                <Link href="/signup" className="skew-x-[12deg]">INITIALIZE</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
