
"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Filter, RotateCcw } from "lucide-react";

const REGIONS = ["서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산"];
const BRANDS = ["Universal Robots", "두산로보틱스", "레인보우로보틱스", "야스카와", "FANUC", "ABB"];
const TAGS = ['용접', '조립', '도장', '검사', '팔레타이징', '픽앤플레이스', 'CNC 로딩', 'AGV', '협동로봇', '비전검사'];
const TIERS = ["Silver", "Gold", "Diamond"];

export function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string | boolean | string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (Array.isArray(value)) {
      params.delete(key);
      value.forEach(v => params.append(key, v));
    } else if (typeof value === 'boolean') {
      if (value) params.set(key, 'true');
      else params.delete(key);
    } else {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const getActiveList = (key: string) => searchParams.getAll(key);
  const isActive = (key: string, value: string) => getActiveList(key).includes(value);

  const toggleList = (key: string, value: string) => {
    const current = getActiveList(key);
    const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    updateFilter(key, updated);
  };

  const resetFilters = () => router.push(pathname);

  return (
    <div className="space-y-8" role="search" aria-label="SI 파트너 필터">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-black tracking-widest uppercase">Filters</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-[10px] font-bold text-muted-foreground uppercase tracking-widest hover:text-primary">
          <RotateCcw className="mr-2 h-3 w-3" />
          Reset
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["region", "brand", "tags", "badge", "tier"]} className="space-y-4">
        <AccordionItem value="region" className="border-white/5">
          <AccordionTrigger className="py-2 text-[10px] font-black uppercase tracking-widest text-primary hover:no-underline">Location</AccordionTrigger>
          <AccordionContent className="pt-4">
            <Select onValueChange={(v) => toggleList("region", v)}>
              <SelectTrigger className="bg-background/50 border-white/10 rounded-none h-8 text-[10px]">
                <SelectValue placeholder="지역 선택" />
              </SelectTrigger>
              <SelectContent className="bg-background border-white/10 rounded-none">
                {REGIONS.map(r => <SelectItem key={r} value={r} className="text-[10px]">{r}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-1 mt-3">
              {getActiveList("region").map(r => (
                <Button key={r} variant="secondary" size="sm" className="h-5 px-2 text-[8px] font-black rounded-none" onClick={() => toggleList("region", r)}>
                  {r} ✕
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand" className="border-white/5">
          <AccordionTrigger className="py-2 text-[10px] font-black uppercase tracking-widest text-primary hover:no-underline">Brands</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-4">
            {BRANDS.map(brand => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox id={`brand-${brand}`} checked={isActive("brand", brand)} onCheckedChange={() => toggleList("brand", brand)} className="rounded-none border-white/20" />
                <Label htmlFor={`brand-${brand}`} className="text-[10px] font-bold text-muted-foreground uppercase cursor-pointer">{brand}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tags" className="border-white/5">
          <AccordionTrigger className="py-2 text-[10px] font-black uppercase tracking-widest text-primary hover:no-underline">Capability</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-4">
            {TAGS.map(tag => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox id={`tag-${tag}`} checked={isActive("tag", tag)} onCheckedChange={() => toggleList("tag", tag)} className="rounded-none border-white/20" />
                <Label htmlFor={`tag-${tag}`} className="text-[10px] font-bold text-muted-foreground uppercase cursor-pointer">{tag}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="badge" className="border-white/5">
          <AccordionTrigger className="py-2 text-[10px] font-black uppercase tracking-widest text-primary hover:no-underline">Verification</AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="has-badge" className="text-[10px] font-bold text-muted-foreground uppercase">Certified Partners Only</Label>
              <Switch id="has-badge" checked={searchParams.get("has_badge") === "true"} onCheckedChange={(checked) => updateFilter("has_badge", checked)} className="data-[state=checked]:bg-primary" />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tier" className="border-none">
          <AccordionTrigger className="py-2 text-[10px] font-black uppercase tracking-widest text-primary hover:no-underline">System Tier</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-4">
            {TIERS.map(tier => (
              <div key={tier} className="flex items-center space-x-2">
                <Checkbox id={`tier-${tier}`} checked={isActive("tier", tier)} onCheckedChange={() => toggleList("tier", tier)} className="rounded-none border-white/20" />
                <Label htmlFor={`tier-${tier}`} className="text-[10px] font-bold text-muted-foreground uppercase cursor-pointer">{tier}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
