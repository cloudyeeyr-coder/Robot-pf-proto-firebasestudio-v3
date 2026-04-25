import Link from "next/link";
import { Cpu, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-background pt-24 pb-12 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="space-y-6 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-6 w-6 bg-primary flex items-center justify-center skew-x-[-12deg]">
                <Cpu className="h-4 w-4 text-primary-foreground skew-x-[12deg]" />
              </div>
              <span className="text-lg font-black text-white tracking-tighter uppercase italic">
                RoboSI <span className="text-primary not-italic">Connect</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm font-light">
              로봇 SI 파트너의 신뢰를 데이터로 증명하고, 
              수요기업에게는 안전한 자동화 도입 환경을 제공하는 
              차세대 로보틱스 매칭 플랫폼입니다.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">Server: Optimal</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Core Services</h4>
            <ul className="text-sm space-y-3 font-light">
              <li><Link href="/search" className="text-muted-foreground hover:text-white transition-colors">SI Partners Search</Link></li>
              <li><Link href="/calculator" className="text-muted-foreground hover:text-white transition-colors">ROI Simulation</Link></li>
              <li><Link href="/escrow-info" className="text-muted-foreground hover:text-white transition-colors">Escrow Protocol</Link></li>
              <li><Link href="/as-info" className="text-muted-foreground hover:text-white transition-colors">SLA Management</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">System Info</h4>
            <address className="text-sm text-muted-foreground not-italic space-y-3 font-light">
              <p>(주)로보SI커넥트 | 김철수</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>서울특별시 강남구 테헤란로 123</p>
              <p>v2.0.4-stable-2026</p>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
            <Terminal className="h-3 w-3" />
            <span>© 2026 ROBOSI_CONNECT_OPERATIONS. All rights reserved.</span>
          </div>
          <div className="flex gap-10">
            <Link href="/terms" className="text-[10px] font-black text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase">Terms</Link>
            <Link href="/privacy" className="text-[10px] font-black text-primary hover:underline transition-colors tracking-widest uppercase">Privacy_Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
