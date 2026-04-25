
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Clock, Activity, AlertTriangle, CheckCircle2, XCircle, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock AS SLA Data
const MOCK_TICKETS = [
  { id: "AS-1024", contractId: "C-901", priority: "urgent", reported: "2026-05-20 10:00", assigned: "2026-05-20 11:30", dispatched: "2026-05-20 14:00", resolved: "2026-05-20 18:00", sla: true },
  { id: "AS-1025", contractId: "C-882", priority: "normal", reported: "2026-05-19 15:00", assigned: "2026-05-19 16:00", dispatched: "2026-05-20 09:00", resolved: null, sla: null },
  { id: "AS-1026", contractId: "C-765", priority: "urgent", reported: "2026-05-18 09:00", assigned: null, dispatched: null, resolved: null, sla: false, overdue: true },
  { id: "AS-1020", contractId: "C-541", priority: "normal", reported: "2026-05-15 11:00", assigned: "2026-05-15 13:00", dispatched: "2026-05-15 15:00", resolved: "2026-05-17 10:00", sla: false },
];

export default function AdminAsSlaPage() {
  const successRate = 94.2;
  const isSlaWarning = successRate < 95;

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
            <ShieldCheck className="h-3 w-3" />
            Service_Level_Agreement_Telemetry
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            Maintenance <span className="text-primary text-glow">Audit</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={cn("glass-panel border-white/10 rounded-none p-8 space-y-4", isSlaWarning && "border-destructive/30")}>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">24h Dispatch Success</p>
              <h3 className={cn("text-5xl font-black tracking-tighter", isSlaWarning && "text-destructive text-glow")}>{successRate}%</h3>
            </div>
            <Activity className={cn("h-6 w-6", isSlaWarning ? "text-destructive animate-pulse" : "text-primary")} />
          </div>
          <div className="pt-4 border-t border-white/5">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Global Objective: ≥ 95%</p>
          </div>
        </Card>

        <Card className="glass-panel border-white/10 rounded-none p-8 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">Unassigned Tickets</p>
              <h3 className="text-5xl font-black tracking-tighter">2<span className="text-lg ml-2 text-destructive">⚠️</span></h3>
            </div>
            <AlertTriangle className="h-6 w-6 text-amber-500 animate-bounce" />
          </div>
          <div className="pt-4 border-t border-white/5">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Over 4h without Engineer</p>
          </div>
        </Card>

        <Card className="glass-panel border-white/10 rounded-none p-8 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">Avg resolution Time</p>
              <h3 className="text-5xl font-black tracking-tighter">18.3h</h3>
            </div>
            <Clock className="h-6 w-6 text-secondary" />
          </div>
          <div className="pt-4 border-t border-white/5">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Based on last 30 days</p>
          </div>
        </Card>
      </div>

      <div className="glass-panel overflow-hidden border-white/10 rounded-none">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-[10px] font-black uppercase text-white/40">Ticket_ID</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-white/40">Contract</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-white/40">Priority</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-white/40">Telemetry (R / A / D / S)</TableHead>
              <TableHead className="text-right text-[10px] font-black uppercase text-white/40">SLA_Compliance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_TICKETS.map((ticket) => (
              <TableRow key={ticket.id} className={cn(
                "border-white/5 transition-colors",
                ticket.overdue && "bg-destructive/5 hover:bg-destructive/10",
                ticket.sla === false && "bg-white/[0.02]"
              )}>
                <TableCell className="font-mono text-[10px] text-primary font-bold">{ticket.id}</TableCell>
                <TableCell className="font-black text-xs">{ticket.contractId}</TableCell>
                <TableCell>
                  <Badge variant={ticket.priority === 'urgent' ? 'destructive' : 'secondary'} className="rounded-none text-[8px] font-black uppercase">
                    {ticket.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className="text-white/40" title="Reported">{ticket.reported}</span>
                    <span className="text-white/10">|</span>
                    <span className={cn(ticket.assigned ? "text-white/60" : "text-destructive animate-pulse")} title="Assigned">{ticket.assigned || "PENDING"}</span>
                    <span className="text-white/10">|</span>
                    <span className="text-white/40" title="Dispatched">{ticket.dispatched || "---"}</span>
                    <span className="text-white/10">|</span>
                    <span className="text-white/40" title="Resolved">{ticket.resolved || "---"}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {ticket.sla === true && <Badge className="bg-green-500/20 text-green-400 border-green-500/30 rounded-none text-[8px] font-black uppercase gap-1"><CheckCircle2 className="h-3 w-3" /> PASS</Badge>}
                  {ticket.sla === false && <Badge className="bg-destructive/20 text-destructive border-destructive/30 rounded-none text-[8px] font-black uppercase gap-1"><XCircle className="h-3 w-3" /> BREACH</Badge>}
                  {ticket.sla === null && <Badge variant="outline" className="border-white/10 text-white/40 rounded-none text-[8px] font-black uppercase gap-1"><Activity className="h-3 w-3" /> TRACKING</Badge>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
