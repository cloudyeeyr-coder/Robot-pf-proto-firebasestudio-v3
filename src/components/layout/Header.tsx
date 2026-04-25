"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, LogOut, User, LayoutDashboard } from "lucide-react";
import { useState } from "react";
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
    { label: "SI 파트너 검색", href: "/search" },
    { label: "비용 계산기", href: "/calculator" },
    { label: "내 계약", href: "/my/contracts" },
    { label: "AS 내역", href: "/my/as-tickets" },
  ],
  si_partner: [
    { label: "내 프로필", href: "/partner/profile" },
    { label: "파트너 제안", href: "/partner/proposals" },
    { label: "뱃지 현황", href: "/partner/badges" },
  ],
  manufacturer: [
    { label: "파트너 현황", href: "/manufacturer/dashboard" },
    { label: "뱃지 관리", href: "/manufacturer/badges" },
    { label: "파트너 제안", href: "/manufacturer/proposals" },
  ],
  admin: [
    { label: "대시보드", href: "/admin" },
    { label: "에스크로", href: "/admin/escrow" },
    { label: "AS SLA", href: "/admin/as-sla" },
    { label: "분쟁", href: "/admin/disputes" },
  ],
};

export function Header() {
  const pathname = usePathname();
  const user = getSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = user ? NAV_ITEMS[user.role] : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary tracking-tight">RoboSI</span>
            <span className="hidden sm:inline-block font-medium text-muted-foreground">Connect</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium" aria-label="주 메뉴">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname.startsWith(item.href) ? "text-primary font-bold" : "text-foreground/60"
                )}
                aria-current={pathname.startsWith(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2 md:gap-4">
              <NotificationBell />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email} ({user.role})
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/my/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>프로필 설정</span>
                    </Link>
                  </DropdownMenuItem>
                  {user.role !== 'buyer' && (
                    <DropdownMenuItem asChild>
                      <Link href={`/${user.role}`}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>관리 포털</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>로그아웃</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">메뉴 열기</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-4 pt-8">
                    <Link 
                      href="/" 
                      className="text-lg font-bold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      RoboSI Connect
                    </Link>
                    <hr />
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "text-lg py-2",
                          pathname.startsWith(item.href) ? "text-primary font-bold" : "text-foreground"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">로그인</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>회원가입 <ChevronDown className="ml-2 h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/signup/buyer">수요기업 회원가입</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/signup/partner">SI 파트너 회원가입</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}