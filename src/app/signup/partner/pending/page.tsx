
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PartnerPendingPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 py-32 tech-grid">
      <div className="max-w-md w-full glass-panel p-12 text-center space-y-10 border-primary/30 relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center border border-primary/50 backdrop-blur-xl">
          <CheckCircle2 className="h-12 w-12 text-primary animate-pulse" />
        </div>

        <div className="space-y-4 pt-6">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Enrollment Sent</h1>
          <p className="text-[10px] font-black text-primary tracking-[0.4em] uppercase">Status: PENDING_REVIEW</p>
        </div>

        <div className="space-y-6 text-sm text-muted-foreground font-light leading-relaxed text-left bg-white/5 p-6 border-l-2 border-primary">
          <div className="flex gap-4">
            <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
            <p>운영팀 검토 후 승인 시 등록하신 이메일로 알림을 보내드립니다.</p>
          </div>
          <div className="flex gap-4">
            <Mail className="h-5 w-5 text-primary shrink-0" />
            <p>예상 검토 기간: 2~3 영업일</p>
          </div>
          <div className="flex gap-4">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <p>검토 완료 전까지 SI 프로필이 검색 결과에 노출되지 않습니다.</p>
          </div>
        </div>

        <div className="space-y-6 pt-6">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Emergency Contact</p>
            <p className="text-sm font-black text-white">support@robotsi-platform.kr</p>
          </div>
          
          <Button asChild className="w-full h-14 bg-white text-black hover:bg-primary hover:text-white font-black rounded-none skew-x-[-12deg] transition-all group">
            <Link href="/" className="flex items-center justify-center gap-2 skew-x-[12deg]">
              RETURN TO HOME
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
