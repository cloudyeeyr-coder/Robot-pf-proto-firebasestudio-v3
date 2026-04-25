import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Search, Calculator, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6">
                <ShieldCheck className="h-4 w-4" />
                <span>국내 최초 로봇 SI 안심 보증 매칭 서비스</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
                로봇 자동화 도입,<br />
                <span className="text-primary">데이터</span>로 검증하고 <span className="text-secondary">보증</span>받으세요.
              </h1>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl">
                SI 파트너의 실제 시공 이력과 재무 건전성을 분석하여 최적의 파트너를 추천합니다. 에스크로 결제와 AS SLA 보증으로 안전하게 도입하세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 text-lg font-bold group" asChild>
                  <Link href="/search">
                    무료 파트너 검색하기
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold" asChild>
                  <Link href="/calculator">도입 비용 계산기</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-[500px] bg-gradient-to-l from-primary/5 to-transparent rounded-l-full -z-10" />
        </section>

        {/* Feature Highlights */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">왜 RoboSI Connect인가요?</h2>
              <p className="text-muted-foreground">로봇 SI 시장의 불투명성을 해결하고 안전한 거래 문화를 만듭니다.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Search,
                  title: "데이터 기반 파트너 매칭",
                  desc: "제조사 정품 뱃지, 시공 실적, 고객 리뷰를 기반으로 실력이 검증된 SI 파트너만 매칭합니다."
                },
                {
                  icon: ShieldCheck,
                  title: "에스크로 안심 결제",
                  desc: "계약금과 중도금을 플랫폼이 안전하게 보관하며, 단계별 검수가 완료된 후 대금을 지급합니다."
                },
                {
                  icon: Calculator,
                  title: "투명한 비용 관리",
                  desc: "로봇 모델별 표준 단가와 맞춤형 견적 시뮬레이션을 통해 도입 비용의 거품을 걷어냅니다."
                }
              ].map((feature, i) => (
                <div key={i} className="bg-background p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats / Proof */}
        <section className="py-20 border-y">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-black text-primary mb-1">1,200+</p>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">누적 매칭 수</p>
              </div>
              <div>
                <p className="text-3xl font-black text-primary mb-1">350개</p>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">검증된 SI 파트너</p>
              </div>
              <div>
                <p className="text-3xl font-black text-primary mb-1">98.5%</p>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">매칭 만족도</p>
              </div>
              <div>
                <p className="text-3xl font-black text-primary mb-1">0건</p>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">에스크로 사고</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}