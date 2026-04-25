
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  ShieldAlert, 
  Wrench, 
  UserPlus, 
  ArrowRight,
  Zap,
  Terminal
} from "lucide-react";

const KPIS = [
  {
    title: "ESCROW_PENDING",
    value: "3",
    label: "에스크로 예치 대기",
    href: "/admin/escrow",
    icon: Activity,
    color: "text-amber-500",
    glow: "rgba(245, 158, 11, 0.3)"
  },
  {
    title: "DISPUTES_ACTIVE",
    value: "2",
    label: "중재 진행 중",
    href: "/admin/disputes",
    icon: ShieldAlert,
    color: "text-destructive",
    glow: "rgba(239, 68, 68, 0.3)"
  },
  {
    title: "AS_UNASSIGNED",
    value: "1",
    label: "긴급 AS 미배정",
    href: "/admin/as-sla",
    icon: Wrench,
    color: "text-primary",
    glow: "rgba(0, 102, 255, 0.3)"
  },
  {
    title: "MONTH_NEW_NODES",
    value: "12",
    label: "이달 신규 가입",
    href: "/admin/events",
    icon: UserPlus,
    color: "text-secondary",
    glow: "rgba(0, 255, 255, 0.3)"
  }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
            <Terminal className="h-3 w-3" />
            System_Control_Center
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            Command <span className="text-primary text-glow">Dashboard</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">Node_Sync: Optimal</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPIS.map((kpi) => (
          <Card key={kpi.title} className="glass-panel border-white/10 rounded-none overflow-hidden relative group hover:border-primary/50 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 transition-all group-hover:opacity-40" style={{ backgroundColor: kpi.glow }} />
            
            <CardHeader className="space-y-1 pb-2">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{kpi.title}</p>
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
              <CardTitle className="text-5xl font-black tracking-tighter">{kpi.value}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{kpi.label}</p>
              <Button asChild variant="ghost" className="w-full h-10 rounded-none border border-white/5 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest group/btn">
                <Link href={kpi.href}>
                  Access Protocol
                  <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-panel border-white/10 rounded-none">
          <CardHeader>
            <CardTitle className="text-xl font-black uppercase tracking-tighter italic">System_Activity_Live</CardTitle>
            <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">실시간 트랜잭션 스트림</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 font-mono text-[10px]">
              {[
                { time: "14:22:05", event: "ESCROW_DEPOSIT", details: "Node_B-102 confirmed $12,400", status: "success" },
                { time: "14:20:12", event: "AS_TICKET_NEW", details: "Urgent request from Client_X", status: "warning" },
                { time: "14:18:45", event: "SI_PROFILE_UPDATE", details: "Partner_Tech_S refreshed data", status: "info" },
                { time: "14:15:30", event: "SECURITY_AUTH", details: "Login Protocol authorized for Admin_K", status: "success" },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 p-2 border-b border-white/5 items-center">
                  <span className="text-white/20">[{log.time}]</span>
                  <span className={cn(
                    "font-black px-2 py-0.5",
                    log.status === 'success' && "text-green-400 bg-green-400/10",
                    log.status === 'warning' && "text-amber-400 bg-amber-400/10",
                    log.status === 'info' && "text-primary bg-primary/10",
                  )}>{log.event}</span>
                  <span className="text-white/60">{log.details}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10 rounded-none">
          <CardHeader>
            <CardTitle className="text-xl font-black uppercase tracking-tighter italic">Risk_Metrics</CardTitle>
            <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">보안 및 리스크 분석</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase">
                <span>Network Integrity</span>
                <span className="text-primary">99.8%</span>
              </div>
              <div className="h-1 bg-white/5">
                <div className="h-full bg-primary w-[99.8%] shadow-[0_0_10px_var(--primary)]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase">
                <span>SLA Compliance</span>
                <span className="text-secondary">94.2%</span>
              </div>
              <div className="h-1 bg-white/5">
                <div className="h-full bg-secondary w-[94.2%] shadow-[0_0_10px_var(--secondary)]" />
              </div>
            </div>
            <div className="pt-4 border-t border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <Zap className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Anomaly Detection: Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
