
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Cpu, 
  Terminal, 
  Activity, 
  Zap, 
  Shield, 
  Globe, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HomePage() {
  const heroImages = PlaceHolderImages.filter(img => 
    ['hero-robot', 'industrial-arm', 'logistics-bot', 'humanoid-interface'].includes(img.id)
  );

  return (
    <div className="min-h-screen flex flex-col tech-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      
      <Header />
      
      <main id="main-content" className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 md:pt-40 md:pb-52">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/20 border border-primary/50 text-primary text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                  <Activity className="h-3 w-3" />
                  <span>System Initialized: Ropto Core 2.0</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter">
                  ROBOTICS <br />
                  <span className="text-primary text-glow italic">INTEGRATION</span> <br />
                  <span className="text-white/40">EVOLVED.</span>
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                  불투명한 로봇 도입 시장의 새로운 기준. <br className="hidden md:block" />
                  실시간 데이터 분석과 에스크로 보증으로 완벽한 자동화를 설계하세요.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/80 font-black rounded-none skew-x-[-12deg] transition-all group">
                    <Link href="/search" className="flex items-center skew-x-[12deg]">
                      START PROTOCOL
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 border-white/20 hover:bg-white/5 font-black rounded-none skew-x-[-12deg] transition-all">
                    <Link href="/calculator" className="skew-x-[12deg]">COST ANALYSIS</Link>
                  </Button>
                </div>

                <div className="pt-12 grid grid-cols-3 gap-8 border-t border-white/5 max-w-md mx-auto lg:mx-0">
                  <div>
                    <p className="text-2xl font-black text-white tracking-tighter">350+</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Verified Partners</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-white tracking-tighter">1.2B</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Secured Escrow</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-white tracking-tighter">98%</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Matching Success</p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full pointer-events-none group-hover:bg-primary/30 transition-all duration-1000" />
                <div className="relative aspect-square max-w-xl mx-auto">
                  <div className="absolute inset-0 border-[20px] border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-8 border border-primary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                  
                  <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                    <Carousel className="w-full h-full" opts={{ loop: true }}>
                      <CarouselContent className="h-full">
                        {heroImages.map((image, index) => (
                          <CarouselItem key={index} className="h-full">
                            <div className="relative w-full h-full overflow-hidden rounded-full border-2 border-white/20 glass-panel animate-float">
                              <Image 
                                src={image.imageUrl} 
                                alt={image.description} 
                                fill
                                className="object-cover grayscale contrast-125 opacity-80 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700"
                                priority={index === 0}
                                data-ai-hint={image.imageHint}
                              />
                              <div className="scan-line" />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      
                      {/* Custom Navigation Buttons */}
                      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
                        <CarouselPrevious className="static translate-y-0 h-12 w-12 bg-background/50 border-white/10 hover:bg-primary hover:text-white transition-all rounded-none skew-x-[-12deg]">
                          <ChevronLeft className="h-6 w-6 skew-x-[12deg]" />
                        </CarouselPrevious>
                        <CarouselNext className="static translate-y-0 h-12 w-12 bg-background/50 border-white/10 hover:bg-primary hover:text-white transition-all rounded-none skew-x-[-12deg]">
                          <ChevronRight className="h-6 w-6 skew-x-[12deg]" />
                        </CarouselNext>
                      </div>
                    </Carousel>
                  </div>

                  {/* HUD Elements */}
                  <div className="absolute -top-4 -right-4 glass-panel p-4 rounded-xl border-primary/30 flex items-center gap-3 animate-pulse z-20">
                    <Terminal className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">Visual_Feed_Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features HUD */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="mb-20 space-y-4">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                CORE <span className="text-primary italic">CAPABILITIES</span>
              </h2>
              <div className="h-1 w-24 bg-primary" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
              {[
                {
                  icon: Cpu,
                  title: "DATA-DRIVEN SELECTION",
                  desc: "단순한 영업이 아닌 시공 실적, 재무 상태, 엔지니어 역량 등 142개 지표를 기반으로 최적의 파트너를 알고리즘이 선정합니다."
                },
                {
                  icon: Shield,
                  title: "SECURE SETTLEMENT",
                  desc: "프로젝트 단계별 마일스톤 기반 에스크로 정산 시스템을 통해 발주사와 수행사 모두의 금전적 리스크를 제로화합니다."
                },
                {
                  icon: Globe,
                  title: "SLA GUARANTEE",
                  desc: "제조사 직접 연계 AS 보증 프로토콜을 적용하여 도입 이후의 유지보수 공백을 플랫폼 차원에서 법적으로 보증합니다."
                }
              ].map((feature, i) => (
                <div key={i} className="bg-background p-12 space-y-6 hover:bg-white/[0.02] transition-colors group">
                  <div className="h-12 w-12 rounded-none border border-primary/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-black">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA HUD */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="relative glass-panel p-16 md:p-24 overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 space-y-8 max-w-2xl">
                <h2 className="text-4xl md:text-7xl font-black leading-none tracking-tighter uppercase">
                  READY TO <br />
                  <span className="text-primary italic">TRANSFORM?</span>
                </h2>
                <p className="text-lg text-muted-foreground font-light">
                  당신의 비즈니스 프로세스를 혁신할 차세대 로봇 솔루션을 지금 바로 매칭받으세요. 
                  모든 데이터는 실시간으로 검증됩니다.
                </p>
                <Button size="lg" className="h-16 px-12 bg-white text-black hover:bg-primary hover:text-white font-black rounded-none skew-x-[-12deg] transition-all group/btn">
                  <Link href="/search" className="flex items-center skew-x-[12deg]">
                    ACCESS DASHBOARD
                    <Zap className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
