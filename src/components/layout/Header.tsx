"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, LogOut, User, LayoutDashboard, Search } from "lucide-react";
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
    { label: "SI 파트너", href: "/search" },
    { label: "비용 계산기", href: "/calculator" },
    { label: "내 계약", href: "/my/contracts" },
    { label: "AS 관리", href: "/my/as-tickets" },
  ],
  si_partner: [
    { label: "프로필", href: "/partner/profile" },
    { label: "제안 관리", href: "/partner/proposals" },
    { label: "인증 뱃지", href: "/partner/badges" },
  ],
  manufacturer: [
    { label: "파트너 현황", href: "/manufacturer/dashboard" },
    { label: "뱃지 관리", href: "/manufacturer/badges" },
    { label: "신규 제안", href: "/manufacturer/proposals" },
  ],
  admin: [
    { label: "통계", href: "/admin" },
    { label: "에스크로", href: "/admin/escrow" },
    { label: "AS SLA", href: "/admin/as-sla" },
    { label: "분쟁 해결", href: "/admin/disputes" },
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
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled 
        ? "bg-background/80 backdrop-blur-lg border-b shadow-sm py-2" 
        : "bg-transparent py-4"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center space-x-1 group">
            <span className="text-2xl font-black text-primary tracking-tighter transition-transform group-hover:scale-105">RoboSI</span>
            <span className="text-2xl font-light text-foreground/40 tracking-tighter">Connect</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8 text-[15px] font-bold" aria-label="Main Navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative transition-all hover:text-primary py-2",
                  pathname.startsWith(item.href) ? "text-primary" : "text-foreground/60"
                )}
              >
                {item.label}
                {pathname.startsWith(item.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full animate-in fade-in duration-300" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full">
            <Search className="h-5 w-5" />
          </Button>

          {user ? (
            <div className="flex items-center gap-3">
              <NotificationBell />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-11 w-11 rounded-2xl p-0 hover:bg-muted ring-2 ring-transparent hover:ring-primary/20 transition-all">
                    <Avatar className="h-10 w-10 rounded-xl overflow-hidden">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback className="rounded-xl">{user.name[0]}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 mt-2 p-2 rounded-2xl shadow-2xl border-muted" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal px-3 py-4">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none">{user.name} 님</p>
                      <p className="text-xs leading-none text-muted-foreground mt-1">
                        {user.email}
                      </p>
                      <div className="mt-2 inline-flex">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wider">
                          {user.role.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-1">
                    <DropdownMenuItem asChild className="rounded-xl py-2.5">
                      <Link href="/my/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>내 계정 정보</span>
                      </Link>
                    </DropdownMenuItem>
                    {user.role !== 'buyer' && (
                      <DropdownMenuItem asChild className="rounded-xl py-2.5">
                        <Link href={`/${user.role}`}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>관리자 대시보드</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-1">
                    <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/5 rounded-xl py-2.5">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>로그아웃</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] rounded-l-3xl border-l-0">
                  <div className="flex flex-col space-y-6 pt-12">
                    <Link 
                      href="/" 
                      className="text-2xl font-black text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      RoboSI
                    </Link>
                    <nav className="flex flex-col gap-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "text-xl font-bold p-3 rounded-2xl transition-all",
                            pathname.startsWith(item.href) ? "bg-primary text-white shadow-lg" : "text-foreground hover:bg-muted"
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
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild className="font-bold text-[15px] hidden sm:flex">
                <Link href="/login">로그인</Link>
              </Button>
              <Button className="rounded-2xl px-6 font-bold shadow-lg shadow-primary/20">
                <Link href="/signup">시작하기</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
