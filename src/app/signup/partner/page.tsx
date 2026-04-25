
"use client"

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { siPartnerSignupSchema, type SiPartnerSignupValues } from "@/lib/schemas/si-partner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, X, Plus, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const PRESET_TAGS = ['용접', '조립', '도장', '검사', '팔레타이징', '픽앤플레이스', 'CNC 로딩', 'AGV', '협동로봇', '비전검사'];

export default function PartnerSignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const form = useForm<SiPartnerSignupValues>({
    resolver: zodResolver(siPartnerSignupSchema),
    mode: "onChange",
    defaultValues: {
      company_name: "",
      biz_registration_no: "",
      region: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      completed_projects: 0,
      failed_projects: 0,
      capability_tags: [],
    },
  });

  const completed = form.watch("completed_projects");
  const failed = form.watch("failed_projects");
  const currentTags = form.watch("capability_tags");

  const successRate = useMemo(() => {
    const total = completed + failed;
    if (total === 0) return "데이터 없음";
    return ((completed / total) * 100).toFixed(1) + "%";
  }, [completed, failed]);

  const formatBizNo = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 10)}`;
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  };

  const handleAddTag = (tag: string) => {
    const normalized = tag.trim();
    if (normalized && !currentTags.includes(normalized) && currentTags.length < 10) {
      form.setValue("capability_tags", [...currentTags, normalized], { shouldValidate: true });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    form.setValue("capability_tags", currentTags.filter(t => t !== tag), { shouldValidate: true });
  };

  async function onSubmit(data: SiPartnerSignupValues) {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/signup/partner/pending");
    }, 2000);
  }

  const regions = ["서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 py-24 tech-grid">
      <Card className="w-full max-w-[640px] glass-panel border-primary/20 rounded-none relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
        <CardHeader className="space-y-4 text-center">
          <CardTitle className="text-4xl font-black tracking-tighter">PARTNER ENROLLMENT</CardTitle>
          <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">SI 파트너 시스템 초기화</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              {/* Section 1: Basic Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/5" />
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">01_Corporate_Base</p>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="company_name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest">Company Name *</FormLabel>
                      <FormControl><Input placeholder="회사명" {...field} className="bg-background/50 border-white/10 rounded-none" /></FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="biz_registration_no" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest">Biz Reg No *</FormLabel>
                      <FormControl><Input placeholder="XXX-XX-XXXXX" {...field} onChange={(e) => field.onChange(formatBizNo(e.target.value))} className="bg-background/50 border-white/10 rounded-none" /></FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="region" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest">Region *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="bg-background/50 border-white/10 rounded-none"><SelectValue placeholder="지역 선택" /></SelectTrigger></FormControl>
                        <SelectContent className="bg-background border-white/10 rounded-none">
                          {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="contact_name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest">Manager Name *</FormLabel>
                      <FormControl><Input placeholder="담당자 성함" {...field} className="bg-background/50 border-white/10 rounded-none" /></FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="contact_email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest">Email Address *</FormLabel>
                      <FormControl><Input type="email" placeholder="example@company.com" {...field} className="bg-background/50 border-white/10 rounded-none" /></FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="contact_phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest">Phone Number *</FormLabel>
                      <FormControl><Input placeholder="010-XXXX-XXXX" {...field} onChange={(e) => field.onChange(formatPhone(e.target.value))} className="bg-background/50 border-white/10 rounded-none" /></FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )} />
                </div>
              </div>

              {/* Section 2: History */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/5" />
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">02_Project_Metrics</p>
                  <div className="h-px flex-1 bg-white/5" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                  <FormField control={form.control} name="completed_projects" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest">Success Count</FormLabel>
                      <FormControl><Input type="number" {...field} className="bg-background/50 border-white/10 rounded-none" /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="failed_projects" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest">Failure Count</FormLabel>
                      <FormControl><Input type="number" {...field} className="bg-background/50 border-white/10 rounded-none" /></FormControl>
                    </FormItem>
                  )} />
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary">Calculation: Success Rate</Label>
                    <div className="h-10 px-3 flex items-center bg-primary/10 border border-primary/20 text-primary font-black text-xl tracking-tighter">
                      {successRate}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Capability Tags */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/5" />
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">03_Technical_Stack</p>
                  <div className="h-px flex-1 bg-white/5" />
                </div>

                <FormField control={form.control} name="capability_tags" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest">Expertise Tags (Max 10)</FormLabel>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2 min-h-[50px] p-3 bg-white/5 border border-white/10 rounded-none">
                        {currentTags.map(tag => (
                          <Badge key={tag} className="bg-primary text-primary-foreground font-bold px-2 py-1 flex items-center gap-1 rounded-none">
                            {tag}
                            <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-black"><X className="h-3 w-3" /></button>
                          </Badge>
                        ))}
                        <input
                          placeholder={currentTags.length === 0 ? "태그를 입력하거나 아래에서 선택하세요" : ""}
                          className="bg-transparent border-none outline-none text-sm flex-1 min-w-[150px] placeholder:text-muted-foreground"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTag(tagInput);
                            }
                            if (e.key === 'Backspace' && !tagInput && currentTags.length > 0) {
                              handleRemoveTag(currentTags[currentTags.length - 1]);
                            }
                          }}
                        />
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {PRESET_TAGS.map(tag => (
                          <Button
                            key={tag}
                            type="button"
                            variant="outline"
                            size="sm"
                            className={cn(
                              "text-[10px] font-bold rounded-none border-white/10 h-8",
                              currentTags.includes(tag) ? "bg-primary text-primary-foreground border-primary" : "hover:border-primary/50"
                            )}
                            onClick={() => currentTags.includes(tag) ? handleRemoveTag(tag) : handleAddTag(tag)}
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )} />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-primary text-primary-foreground font-black rounded-none skew-x-[-12deg] transition-all group">
                <span className="skew-x-[12deg] flex items-center gap-2">
                  {isSubmitting ? <><Loader2 className="h-5 w-5 animate-spin" />SUBMITTING...</> : <>SUBMIT FOR VERIFICATION</>}
                </span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
