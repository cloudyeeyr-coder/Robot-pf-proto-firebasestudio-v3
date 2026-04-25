
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  ShieldCheck, 
  Users, 
  FileText, 
  Settings, 
  Award, 
  MessageSquare, 
  AlertCircle,
  History,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRole } from "@/lib/auth-mock";

const SIDEBAR_ITEMS: Record<Exclude<UserRole, 'buyer'>, { label: string; href: string; icon: any }[]> = {
  si_partner: [
    { label: "프로필 대시보드", href: "/partner/profile", icon: LayoutDashboardIcon },
    { label: "받은 제안", href: "/partner/proposals", icon: MessageSquare },
    { label: "뱃지 목록", href: "/partner/badges", icon: Award },
    { label: "계약 관리", href: "/partner/contracts", icon: FileText },
    { label: "설정", href: "/partner/settings", icon: Settings },
  ],
  manufacturer: [
    { label: "전체 파트너 현황", href: "/manufacturer/dashboard", icon: BarChart3 },
    { label: "뱃지 발급/관리", href: "/manufacturer/badges", icon: Award },
    { label: "신규 제안 보내기", href: "/manufacturer/proposals", icon: MessageSquare },
    { label: "SLA 모니터링", href: "/manufacturer/sla", icon: ShieldCheck },
  ],
  admin: [
    { label: "통합 대시보드", href: "/admin", icon: BarChart3 },
    { label: "에스크로 자금 관리", href: "/admin/escrow", icon: CreditCard },
    { label: "AS SLA 통계", href: "/admin/as-sla", icon: ShieldCheck },
    { label: "회원사 관리", href: "/admin/users", icon: Users },
    { label: "분쟁 해결 센터", href: "/admin/disputes", icon: AlertCircle },
    { label: "시스템 이벤트 로그", href: "/admin/events", icon: History },
  ],
};

function LayoutDashboardIcon(props: any) {
  return <BarChart3 {...props} />;
}

export function Sidebar({ role }: { role: Exclude<UserRole, 'buyer'> }) {
  const pathname = usePathname();
  const items = SIDEBAR_ITEMS[role];

  return (
    <aside className="hidden md:flex w-64 flex-col fixed left-0 top-24 bottom-0 border-r border-white/5 bg-background/50 backdrop-blur-xl p-4 z-40">
      <nav className="flex flex-col space-y-2" aria-label="관리 메뉴">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-none text-[10px] font-black uppercase tracking-widest transition-all",
              pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,102,255,0.3)]" 
                : "text-white/40 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-white/5">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-black px-4 py-2">Support_Nodes</p>
        <Link 
          href="/support" 
          className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-white/40 hover:text-primary transition-colors"
        >
          <MessageSquare className="h-4 w-4" />
          <span>HELP_DESK</span>
        </Link>
      </div>
    </aside>
  );
}
