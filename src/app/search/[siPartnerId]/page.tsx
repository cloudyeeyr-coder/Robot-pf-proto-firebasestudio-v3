
"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldCheck, Star, FileDown, Calendar, MapPin, Loader2, Award, Zap, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Mock Data fetching simulation
const getPartner = (id: string) => ({
  id,
  name: "로봇시공 코퍼레이션",
  region: "서울 강남구",
  tier: "Diamond",
  joinedAt: "2024-03-15",
  updatedAt: "2026-04-20",
  financialGrade: "A+",
  financialUpdateAt: "2026-03-15",
  successRate: 98.5,
  completed: 124,
  failed: 2,
  rating: 4.9,
  reviews: 52,
  tags: ["용접", "조립", "협동로봇", "비전검사", "AGV", "물류 자동화", "정밀 팔레타이징"],
  history: [
    { title: "S전자 평택공장 용접 로봇 32기 구축", year: "2025" },
    { title: "H자동차 울산공장 조립 라인 최적화", year: "2025" },
    { title: "C커머스 김포 센터 AGV 시스템 도입", year: "2024" },
  ],
  badges: [
    { brand: "Universal Robots", issuedAt: "2024-01-10", expiresAt: "2026-01-10", status: "active" },
    { brand: "두산로보틱스", issuedAt: "2024-05-20", expiresAt: "2026-05-20", status: "active" },
    { brand: "FANUC", issuedAt: "2023-11-15", expiresAt: "2025-11-15", status: "active" },
  ],
  reviewSummary: "대규모 제조 시설 구축 경험이 풍부하며, 특히 용접 정밀도 면에서 매우 높은 만족도를 기록하고 있습니다. 사후 관리(AS) 응답 속도가 평균 4시간 이내로 매우 신속합니다."
});

export default function SiDetailPage({ params }: { params: { siPartnerId: string } }) {
  const { toast } = useToast();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const si = getPartner(params.siPartnerId);

  const handlePdfDownload = () => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
      setIsGeneratingPdf(false);
      toast({
        title: "리포트 생성 완료",
        description: "SI 파트너 기안용 리포트(PDF)가 다운로드되었습니다.",
      });
      // Mock download logic
      const blob = new Blob(["Mock PDF Content"], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${si.name}_Ropto_Report.pdf`;
      a.click();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-48 tech-grid">
      <div className="container mx-auto px-4 max-w-5xl space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-primary text-primary-foreground font-black uppercase rounded-none px-3">{si.tier} System</Badge>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                <MapPin className="h-3 w-3" />
                {si.region}
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">{si.name}</h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2"><Calendar className="h-3 w-3" /> System Initialized: {si.joinedAt}</span>
              <span className="flex items-center gap-2"><Activity className="h-3 w-3" /> Last Data Refresh: {si.updatedAt}</span>
            </div>
          </div>
          
          <Button 
            onClick={handlePdfDownload} 
            disabled={isGeneratingPdf}
            className="h-16 px-10 bg-primary text-primary-foreground font-black rounded-none skew-x-[-12deg] transition-all group"
          >
            <span className="skew-x-[12deg] flex items-center gap-3">
              {isGeneratingPdf ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileDown className="h-5 w-5" />}
              GENERATE REPORT PDF
            </span>
          </Button>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-panel border-white/10 rounded-none p-8 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">Financial Grade</p>
              <h3 className="text-5xl font-black tracking-tighter">{si.financialGrade}</h3>
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Ref Date: {si.financialUpdateAt}</p>
              <p className="text-[9px] text-white/30 uppercase mt-1">* 운영팀 사전 업데이트 데이터 기준</p>
            </div>
          </Card>

          <Card className="glass-panel border-white/10 rounded-none p-8 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Success Rate</p>
                <h3 className="text-5xl font-black tracking-tighter">{si.successRate}%</h3>
              </div>
              <div className="relative h-16 w-16">
                <svg viewBox="0 0 36 36" className="h-full w-full rotate-[-90deg]">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.1" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--primary)" strokeWidth="3" strokeDasharray={`${si.successRate}, 100`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-primary animate-pulse" />
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                Success: {si.completed} / Failed: {si.failed}
              </p>
            </div>
          </Card>

          <Card className="glass-panel border-white/10 rounded-none p-8 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">Avg Rating</p>
              <div className="flex items-center gap-3">
                <h3 className="text-5xl font-black tracking-tighter">{si.rating.toFixed(1)}</h3>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("h-4 w-4", i < Math.floor(si.rating) ? "text-amber-500 fill-amber-500" : "text-white/10")} />
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest" aria-label={`평점 ${si.rating}점 (${si.reviews}건 리뷰)`}>
                Verified Reviews: {si.reviews}
              </p>
            </div>
          </Card>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="capabilities" className="space-y-8">
          <TabsList className="bg-transparent border-b border-white/5 rounded-none w-full justify-start h-auto p-0 space-x-12">
            <TabsTrigger value="capabilities" className="bg-transparent border-none rounded-none text-xl font-black tracking-tighter uppercase data-[state=active]:text-primary data-[state=active]:border-b-4 data-[state=active]:border-primary pb-4 px-0 transition-all">
              _Capablities
            </TabsTrigger>
            <TabsTrigger value="badges" className="bg-transparent border-none rounded-none text-xl font-black tracking-tighter uppercase data-[state=active]:text-primary data-[state=active]:border-b-4 data-[state=active]:border-primary pb-4 px-0 transition-all">
              _Certification
            </TabsTrigger>
            <TabsTrigger value="reviews" className="bg-transparent border-none rounded-none text-xl font-black tracking-tighter uppercase data-[state=active]:text-primary data-[state=active]:border-b-4 data-[state=active]:border-primary pb-4 px-0 transition-all">
              _Intelligence
            </TabsTrigger>
          </TabsList>

          <TabsContent value="capabilities" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Technical_Stack</p>
              <div className="flex flex-wrap gap-3">
                {si.tags.map(tag => (
                  <Badge key={tag} className="bg-white/5 text-white border-white/10 px-4 py-2 text-sm font-bold rounded-none hover:bg-primary hover:text-primary-foreground transition-all cursor-default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Project_History</p>
              <div className="grid gap-4">
                {si.history.map((project, i) => (
                  <div key={i} className="flex justify-between items-center p-6 bg-white/5 border border-white/5 hover:border-primary/30 transition-all">
                    <span className="text-lg font-black tracking-tight">{project.title}</span>
                    <span className="text-[10px] font-mono text-primary font-bold">{project.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="badges" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass-panel overflow-hidden border-white/10 rounded-none">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10">
                    <TableHead className="text-[10px] font-black uppercase text-white/40">Manufacturer</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-white/40">Issued Date</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-white/40">Expiry Date</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-white/40">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {si.badges.map((badge, i) => (
                    <TableRow key={i} className="border-white/5 hover:bg-white/5">
                      <TableCell className="font-black text-white">{badge.brand}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{badge.issuedAt}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{badge.expiresAt}</TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "rounded-none text-[8px] font-black uppercase",
                          badge.status === 'active' ? "bg-green-500/20 text-green-400" : "bg-slate-500/20 text-slate-400"
                        )}>
                          {badge.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="glass-panel border-white/10 rounded-none p-12 space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter italic">Review_Intelligence_Summary</h3>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground font-light leading-relaxed border-l-4 border-primary pl-8 italic">
                  "{si.reviewSummary}"
                </p>
              </div>

              <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5">
                <div className="space-y-1">
                  <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">AS Response</p>
                  <p className="text-xl font-black text-white tracking-tighter">&lt; 4.0h</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">Tech Precision</p>
                  <p className="text-xl font-black text-white tracking-tighter">9.8 / 10</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">Compliance</p>
                  <p className="text-xl font-black text-white tracking-tighter">100%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">Repeat Rate</p>
                  <p className="text-xl font-black text-white tracking-tighter">85%</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
