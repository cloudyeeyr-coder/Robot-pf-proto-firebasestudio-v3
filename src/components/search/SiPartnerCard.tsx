
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SiPartnerCardProps {
  id: string;
  name: string;
  region: string;
  tier: 'Silver' | 'Gold' | 'Diamond';
  successRate: number;
  completed: number;
  failed: number;
  tags: string[];
  badges: string[];
  rating: number;
  reviews: number;
}

export function SiPartnerCard({ id, name, region, tier, successRate, completed, failed, tags, badges, rating, reviews }: SiPartnerCardProps) {
  const tierColors = {
    Silver: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    Gold: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Diamond: "bg-primary/20 text-primary border-primary/30"
  };

  return (
    <div className="glass-panel p-6 space-y-6 border-white/5 hover:border-primary/50 transition-all group relative overflow-hidden" role="article">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
      
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Badge className={cn("rounded-none text-[8px] font-black uppercase tracking-widest border", tierColors[tier])}>
            {tier} System
          </Badge>
          <h3 className="text-xl font-black tracking-tighter uppercase group-hover:text-primary transition-colors">{name}</h3>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{region}</p>
        </div>
        <div className="flex items-center gap-1 bg-white/5 px-2 py-1 border border-white/10">
          <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
          <span className="text-[10px] font-black text-white">{rating.toFixed(1)}</span>
          <span className="text-[8px] text-muted-foreground">({reviews})</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary">Success Rate</p>
          <p className="text-xl font-black tracking-tighter">{successRate}%</p>
        </div>
        <Progress value={successRate} className="h-1.5 rounded-none bg-white/5" />
        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
          COMPLETED: {completed}건 · FAILED: {failed}건
        </p>
      </div>

      <div className="space-y-4 pt-4 border-t border-white/5">
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 4).map(tag => (
            <Badge key={tag} variant="outline" className="text-[8px] font-bold rounded-none border-white/10 uppercase py-0 px-2 h-5">
              {tag}
            </Badge>
          ))}
          {tags.length > 4 && <span className="text-[8px] text-muted-foreground font-bold">+{tags.length - 4}</span>}
        </div>

        <div className="flex items-center gap-3">
          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Auth:</p>
          <div className="flex gap-2">
            {badges.map(b => (
              <div key={b} className="h-5 w-5 rounded-none border border-white/10 flex items-center justify-center bg-white/5 hover:border-primary/50 transition-all cursor-help" title={b}>
                <ShieldCheck className="h-3 w-3 text-primary" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button asChild className="w-full h-12 bg-white/5 text-white hover:bg-primary hover:text-white font-black rounded-none skew-x-[-12deg] transition-all group/btn border border-white/10">
        <Link href={`/search/${id}`} className="flex items-center justify-center gap-2 skew-x-[12deg]">
          VIEW DETAILS
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </div>
  );
}
