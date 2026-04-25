
"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Terminal, ArrowRight, Gavel, History } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Dispute Data
const MOCK_DISPUTES = [
  { id: "C-901", buyer: "삼성전자", partner: "로봇시공 코퍼레이션", date: "2026-05-18", reason: "품질 미달 (용접 정밀도 부족)", status: "investigating" },
  { id: "C-882", buyer: "현대자동차", partner: "넥스트 오토메이션", date: "2026-05-15", reason: "사양 불일치 (그리퍼 모델 상이)", status: "mediation" },
  { id: "C-765", buyer: "쿠팡 로지스틱스", partner: "하이테크 로보틱스", date: "2026-05-10", reason: "납기 지연 (30일 초과)", status: "resolved" },
];

export default function AdminDisputesPage() {
  const statusColors = {
    investigating: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    mediation: "bg-primary/20 text-primary border-primary/30",
    resolved: "bg-green-500/20 text-green-400 border-green-500/30",
  };

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
            <Gavel className="h-3 w-3" />
            Legal_Mediation_Protocol
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            Conflict <span className="text-primary text-glow">Audit</span>
          </h1>
        </div>
      </div>

      <div className="glass-panel overflow-hidden border-white/10 rounded-none">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-[10px] font-black uppercase text-white/40">Contract_ID</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-white/40">Disputants</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-white/40">Incident_Date</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-white/40">Rejection_Reason</TableHead>
              <TableHead className="text-[10px] font-black uppercase text-white/40">Protocol_Status</TableHead>
              <TableHead className="text-right text-[10px] font-black uppercase text-white/40">Execute</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_DISPUTES.map((dispute) => (
              <TableRow key={dispute.id} className="border-white/5 hover:bg-white/5 transition-colors">
                <TableCell className="font-mono text-[10px] text-primary font-bold">{dispute.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-black text-sm">{dispute.buyer}</span>
                    <span className="text-[10px] text-muted-foreground">{dispute.partner}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-[10px] text-white/40">{dispute.date}</TableCell>
                <TableCell className="max-w-[250px] truncate text-xs text-white/60 italic">
                  {dispute.reason}
                </TableCell>
                <TableCell>
                  <Badge className={cn("rounded-none text-[8px] font-black uppercase border", statusColors[dispute.status as keyof typeof statusColors])}>
                    {dispute.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" className="h-8 bg-white/5 text-white hover:bg-primary hover:text-white font-black text-[10px] rounded-none border border-white/10">
                      START_MEDIATION
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none border border-white/5">
                      <History className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-panel border-white/10 rounded-none p-8 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-destructive" />
            <h3 className="text-xl font-black uppercase tracking-tighter">Escrow_Freeze_Notice</h3>
          </div>
          <p className="text-sm text-muted-foreground font-light leading-relaxed">
            분쟁이 접수된 계약의 에스크로 자금은 자동으로 동결(Freeze) 처리됩니다. 
            운영팀의 최종 중재 결정 또는 양측 합의 전까지 대금 방출이 불가능합니다.
          </p>
        </Card>
        
        <Card className="glass-panel border-white/10 rounded-none p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-black uppercase tracking-tighter">Mediation_SLA</h3>
          </div>
          <p className="text-sm text-muted-foreground font-light leading-relaxed">
            분쟁 접수 후 48시간 이내에 운영팀의 기초 조사가 완료되어야 합니다. 
            조사 지연 시 시스템 감사 로그에 자동 기록됩니다.
          </p>
        </Card>
      </div>
    </div>
  );
}
