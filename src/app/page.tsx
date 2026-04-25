import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Search, Calculator, CheckCircle2, Zap, Globe, Lock } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function HomePage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-robot');

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 bg-mesh">
        {/* Hero Section */}
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-40 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 border border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <ShieldCheck className="h-4 w-4" />
                  <span>No.1 Trusted Robot SI Platform</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tight">
                  로봇 자동화의 미래,<br />
                  <span className="text-gradient">데이터</span>로 연결하고<br />
                  <span className="text-foreground">안심</span>을 보증합니다.
                </h1>
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  단순한 매칭을 넘어, 시공 실적과 재무 건전성 데이터를 기반으로<br className="hidden md:block" />
                  검증된 최적의 SI 파트너를 제안합니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all group">
                    <Link href="/search" className="flex items-center">
                      파트너 탐색하기
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-16 px-10 text-lg font-bold rounded-2xl border-2 hover:bg-accent/50 transition-all">
                    <Link href="/calculator">도입 비용 계산</Link>
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 relative w-full max-w-2xl animate-in fade-in zoom-in duration-1000">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50">
                  <Image 
                    src={heroImage?.imageUrl || "https://picsum.photos/seed/robot/800/600"} 
                    alt="Industrial Robot" 
                    width={800} 
                    height={600}
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                    data-ai-hint="industrial robot"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                {/* Floating Glass Cards */}
                <div className="absolute -bottom-6 -left-6 glass-effect p-6 rounded-3xl hidden md:block animate-bounce-slow">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-white">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">최근 매칭</p>
                      <p className="text-lg font-bold">2.4분 전 완료</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 glass-effect p-6 rounded-3xl hidden md:block animate-bounce-slow delay-300">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">검증 파트너</p>
                      <p className="text-lg font-bold">350+ 기업</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="py-32 bg-white/50 backdrop-blur-sm relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">혁신적인 도입 프로세스</h2>
              <p className="text-lg text-muted-foreground font-medium">로봇 도입의 고질적인 불투명성을 데이터 기술로 해결했습니다.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: Search,
                  color: "bg-blue-500",
                  title: "정밀 데이터 매칭",
                  desc: "단순한 필터가 아닙니다. 72가지 시공 실적 지표와 재무 데이터를 분석하여 오차 없는 파트너를 찾습니다."
                },
                {
                  icon: Lock,
                  color: "bg-indigo-500",
                  title: "에스크로 스마트 계약",
                  desc: "단계별 마일스톤 검수가 완료될 때마다 플랫폼이 대금을 안전하게 정산하여 양측의 리스크를 제거합니다."
                },
                {
                  icon: Globe,
                  color: "bg-cyan-500",
                  title: "글로벌 SLA 보증",
                  desc: "표준화된 서비스 수준 협약(SLA)을 통해 도입 후 발생할 수 있는 AS 지연 문제를 원천 차단합니다."
                }
              ].map((feature, i) => (
                <div key={i} className="group relative bg-white p-10 rounded-[2rem] border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`h-16 w-16 rounded-2xl ${feature.color} flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-200/50 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">{feature.desc}</p>
                  <div className="mt-8 flex items-center text-primary font-bold text-sm cursor-pointer hover:underline">
                    자세히 보기 <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-8">지금 바로 무료로 진단받으세요.</h2>
                <p className="text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto font-medium">
                  성공적인 로봇 자동화의 첫걸음은 정확한 진단에서 시작됩니다.<br className="hidden md:block" />
                  도입 비용 시뮬레이션부터 파트너 추천까지 한 번에.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <Button size="lg" variant="secondary" className="h-16 px-12 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform" asChild>
                    <Link href="/calculator">진단 시작하기</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
