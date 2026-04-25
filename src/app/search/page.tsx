
import { Suspense } from "react";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SiPartnerCard } from "@/components/search/SiPartnerCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Loader2 } from "lucide-react";

// Mock Data
const MOCK_PARTNERS = [
  { id: "1", name: "로봇시공 코퍼레이션", region: "서울", tier: "Diamond", successRate: 98.5, completed: 124, failed: 2, tags: ["용접", "조립", "협동로봇", "비전검사", "AGV"], badges: ["UR", "두산"], rating: 4.9, reviews: 52 },
  { id: "2", name: "넥스트 오토메이션", region: "경기", tier: "Gold", successRate: 94.2, completed: 85, failed: 5, tags: ["팔레타이징", "픽앤플레이스", "CNC 로딩"], badges: ["레인보우", "ABB"], rating: 4.7, reviews: 38 },
  { id: "3", name: "테크니컬 솔루션", region: "부산", tier: "Silver", successRate: 88.0, completed: 44, failed: 6, tags: ["도장", "검사", "비전검사"], badges: ["FANUC"], rating: 4.5, reviews: 15 },
  { id: "4", name: "하이테크 로보틱스", region: "인천", tier: "Diamond", successRate: 96.8, completed: 210, failed: 7, tags: ["조립", "협동로봇", "AGV"], badges: ["UR", "두산", "레인보우"], rating: 4.8, reviews: 89 },
];

function ResultsHeader({ count }: { count: number }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tighter uppercase italic">Search Results</h1>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold" aria-live="polite">
          Total Nodes Detected: <span className="text-primary">{count}</span> SI Partners
        </p>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Sort_By:</p>
        <Select defaultValue="success_rate">
          <SelectTrigger className="w-[180px] h-10 bg-background/50 border-white/10 rounded-none text-[10px] font-black uppercase tracking-widest">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border-white/10 rounded-none">
            <SelectItem value="success_rate" className="text-[10px]">Success Rate</SelectItem>
            <SelectItem value="rating" className="text-[10px]">High Rating</SelectItem>
            <SelectItem value="latest" className="text-[10px]">Latest Entry</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function SearchSkeleton() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="glass-panel p-6 space-y-6 border-white/5">
          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-white/5" />
              <Skeleton className="h-8 w-48 bg-white/5" />
            </div>
            <Skeleton className="h-6 w-12 bg-white/5" />
          </div>
          <Skeleton className="h-4 w-full bg-white/5" />
          <Skeleton className="h-1.5 w-full bg-white/5" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16 bg-white/5" />
            <Skeleton className="h-8 w-16 bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-32 tech-grid">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Filter Panel */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div className="glass-panel p-6 border-white/10 rounded-none">
              <SearchFilters />
            </div>
          </aside>

          {/* Right Content */}
          <main id="main-content" className="flex-1">
            <ResultsHeader count={MOCK_PARTNERS.length} />
            
            <Suspense fallback={<SearchSkeleton />}>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {MOCK_PARTNERS.length > 0 ? (
                  MOCK_PARTNERS.map(si => (
                    <SiPartnerCard key={si.id} {...si} />
                  ))
                ) : (
                  <div className="col-span-full py-32 text-center space-y-6 glass-panel border-white/5">
                    <div className="mx-auto w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center">
                      <Search className="h-8 w-8 text-white/20" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black uppercase tracking-tighter">No Nodes Detected</h3>
                      <p className="text-sm text-muted-foreground font-light">필터를 조정하거나 다른 검색 조건을 시도해주세요.</p>
                    </div>
                  </div>
                )}
              </div>
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
