
"use client"

import Link from "next/link";
import { RoptoLogo } from "@/components/brand/RoptoLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Cpu, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function SignupSelectionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 tech-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-4xl space-y-12">
        <div className="flex flex-col items-center space-y-6 text-center">
          <Link href="/">
            <RoptoLogo className="scale-125" />
          </Link>
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              INITIALIZE <span className="text-primary text-glow">PROTOCOL</span>
            </h1>
            <p className="text-muted-foreground uppercase tracking-[0.3em] text-[10px] font-bold">
              회원 유형을 선택하여 시스템 초기화를 시작하십시오
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Buyer Card */}
          <Link href="/signup/buyer" className="group">
            <Card className="h-full glass-panel border-white/10 rounded-none p-8 hover:border-primary/50 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all" />
              
              <CardContent className="p-0 space-y-8 relative z-10">
                <div className="h-16 w-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Building2 className="h-8 w-8" />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl font-black tracking-tighter uppercase italic">Buyer</h2>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">수요기업</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    로봇 도입을 희망하는 기업입니다. 검증된 SI 파트너를 찾고 에스크로 기반의 안전한 계약 시스템을 이용할 수 있습니다.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-primary transition-colors">Start Integration</span>
                  <ArrowRight className="h-5 w-5 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Partner Card */}
          <Link href="/signup/partner" className="group">
            <Card className="h-full glass-panel border-white/10 rounded-none p-8 hover:border-primary/50 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all" />
              
              <CardContent className="p-0 space-y-8 relative z-10">
                <div className="h-16 w-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Cpu className="h-8 w-8" />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl font-black tracking-tighter uppercase italic">SI Partner</h2>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">공급기업</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    로봇 시스템 통합 및 시공 전문 기업입니다. Ropto의 검증 프로세스를 거쳐 우수 고객사들과 매칭될 수 있습니다.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-primary transition-colors">Join Ecosystem</span>
                  <ArrowRight className="h-5 w-5 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="text-center pt-8">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
            이미 계정이 있으신가요? <Link href="/login" className="text-primary hover:underline">로그인 프로토콜 실행</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
