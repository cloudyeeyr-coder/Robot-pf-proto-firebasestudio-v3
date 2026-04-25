
"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, CheckCircle2, ArrowUpRight, History, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Escrow Data
const MOCK_ESCROWS = [
  { id: "TX-901", buyer: "삼성전자", partner: "로봇시공 코퍼레이션", amount: 45000000, status: "pending", date: "2026-05-20", memo: "" },
  { id: "TX-882", buyer: "현대자동차", partner: "넥스트 오토메이션", amount: 128000000, status: "held", date: "2026-05-18", memo: "입금 확인 완료 (신한은행)" },
  { id: "TX-765", buyer: "쿠팡 로지스틱스", partner: "하이테크 로보틱스", amount: 24500000, status: "released", date: "2026-05-15", memo: "최종 시공 승인됨" },
  { id: "TX-541", buyer: "CJ제일제당", partner: "테크니컬 솔루션", amount: 12000000, status: "refunded", date: "2026-05-10", memo: "계약 취소 요청" },
];

export default function AdminEscrowPage() {
  const { toast } = useToast();
  const [escrows, setEscrows] = useState(MOCK_ESCROWS);
  const [memo, setMemo] = useState("");

  const handleConfirmDeposit = (id: string) => {
    if (memo.length < 5) {
      toast({ variant: "destructive", title: "입력 오류", description: "Admin 메모를 5자 이상 입력해주세요." });
      return;
    }
    setEscrows(prev => prev.map(e => e.id === id ? { ...e, status: "held", memo } : e));
    setMemo("");
    toast({ title: "입금 확인 완료", description: "에스크로 상태가 'held'로 업데이트되었습니다." });
  };

  const handleReleaseFunds = (id: string) => {
    setEscrows(prev => prev.map(e => e.id === id ? { ...e, status: "released" } : e));
    toast({ title: "대금 방출 완료", description: "SI 파트너에게 대금이 성공적으로 지급되었습니다." });
  };

  const statusColors = {
    pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    held: "bg-primary/20 text-primary border-primary/30",
    released: "bg-green-500/20 text-green-400 border-green-500/30",
    refunded: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  };

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
            <CreditCard className="h-3 w-3" />
            Escrow_Liquidity_Protocol
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            Settlement <span className="text-primary text-glow">Audit</span>
          </h1>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-8">
        <TabsList className="bg-transparent border-b border-white/5 rounded-none w-full justify-start h-auto p-0 space-x-12">
          {["all", "pending", "held", "released", "refunded"].map(status => (
            <TabsTrigger 
              key={status} 
              value={status} 
              className="bg-transparent border-none rounded-none text-sm font-black tracking-widest uppercase data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary pb-4 px-0 transition-all"
            >
              _{status.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        {["all", "pending", "held", "released", "refunded"].map(tabStatus => (
          <TabsContent key={tabStatus} value={tabStatus} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass-panel overflow-hidden border-white/10 rounded-none">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-[10px] font-black uppercase text-white/40">TX_ID</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-white/40">Buyer / Partner</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-white/40">Amount</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-white/40">Status</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-white/40">Audit_Log</TableHead>
                    <TableHead className="text-right text-[10px] font-black uppercase text-white/40">Execute</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {escrows
                    .filter(e => tabStatus === "all" || e.status === tabStatus)
                    .map((escrow) => (
                      <TableRow key={escrow.id} className="border-white/5 hover:bg-white/5 transition-colors">
                        <TableCell className="font-mono text-[10px] text-white/60">{escrow.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-black text-sm">{escrow.buyer}</span>
                            <span className="text-[10px] text-muted-foreground">{escrow.partner}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-black text-white italic">
                          ₩{escrow.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={cn("rounded-none text-[8px] font-black uppercase border", statusColors[escrow.status as keyof typeof statusColors])}>
                            {escrow.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-[10px] text-white/40 italic">
                          {escrow.memo || "No records."}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {escrow.status === "pending" && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" className="h-8 bg-primary text-primary-foreground font-black text-[10px] rounded-none">CONFIRM_DEPOSIT</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="glass-panel border-white/10 rounded-none">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-2xl font-black uppercase tracking-tighter italic">Verify Deposit Protocol</AlertDialogTitle>
                                    <AlertDialogDescription className="text-sm font-light text-muted-foreground">법인 계좌에 실제 입금액이 확인된 경우에만 승인하십시오.</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <div className="py-4 space-y-4">
                                    <div className="space-y-2">
                                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">Admin_Security_Memo *</p>
                                      <Textarea 
                                        placeholder="입금 일시, 은행명 등을 기록하십시오 (최소 5자)" 
                                        className="bg-background/50 border-white/10 rounded-none h-24 focus:border-primary"
                                        value={memo}
                                        onChange={(e) => setMemo(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="rounded-none border-white/10">CANCEL</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleConfirmDeposit(escrow.id)}
                                      className="bg-primary text-primary-foreground font-black rounded-none"
                                    >
                                      EXECUTE_VERIFICATION
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}

                            {escrow.status === "held" && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" className="h-8 bg-green-500 text-black hover:bg-green-400 font-black text-[10px] rounded-none">RELEASE_FUNDS</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="glass-panel border-white/10 rounded-none">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-2xl font-black uppercase tracking-tighter italic">Asset Release Protocol</AlertDialogTitle>
                                    <AlertDialogDescription className="text-sm font-light text-muted-foreground">수기 송금이 완료된 후 대금 방출을 최종 확정하십시오.</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="rounded-none border-white/10">CANCEL</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleReleaseFunds(escrow.id)}
                                      className="bg-green-500 text-black font-black rounded-none"
                                    >
                                      CONFIRM_RELEASE
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                            
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none border border-white/5 hover:bg-white/5">
                              <History className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
