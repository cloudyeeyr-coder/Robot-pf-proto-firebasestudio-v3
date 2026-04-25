
"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { buyerSignupSchema, type BuyerSignupValues } from "@/lib/schemas/buyer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight } from "lucide-react";

export default function BuyerSignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BuyerSignupValues>({
    resolver: zodResolver(buyerSignupSchema),
    mode: "onChange",
    defaultValues: {
      company_name: "",
      biz_registration_no: "",
      region: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
    },
  });

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

  async function onSubmit(data: BuyerSignupValues) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "회원가입 완료",
        description: "Ropto 수요기업 회원으로 가입되었습니다.",
      });
      router.push("/search");
    }, 2000);
  }

  const regions = ["서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 py-24 tech-grid">
      <Card className="w-full max-w-[560px] glass-panel border-primary/20 rounded-none relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
        <CardHeader className="space-y-4 text-center">
          <CardTitle className="text-4xl font-black tracking-tighter">BUYER INITIALIZATION</CardTitle>
          <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">수요기업 보안 프로토콜 승인</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest">Company Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="회사명을 입력하세요" {...field} className="bg-background/50 border-white/10 rounded-none focus:border-primary" />
                      </FormControl>
                      <FormMessage className="text-[10px] font-bold uppercase" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="biz_registration_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest">Business Reg No *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="XXX-XX-XXXXX" 
                          {...field} 
                          onChange={(e) => field.onChange(formatBizNo(e.target.value))}
                          className="bg-background/50 border-white/10 rounded-none"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] font-bold uppercase" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest">Region *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-white/10 rounded-none">
                              <SelectValue placeholder="지역 선택" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background border-white/10 rounded-none">
                            {regions.map((r) => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px] font-bold uppercase" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="segment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest">Industry Segment *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-white/10 rounded-none">
                              <SelectValue placeholder="세그먼트 선택" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background border-white/10 rounded-none">
                            <SelectItem value="Q1">Q1 (제조)</SelectItem>
                            <SelectItem value="Q2">Q2 (물류)</SelectItem>
                            <SelectItem value="Q3">Q3 (식품)</SelectItem>
                            <SelectItem value="Q4">Q4 (기타)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px] font-bold uppercase" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-6 border-t border-white/5 space-y-6">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Contact Information</p>
                  
                  <FormField
                    control={form.control}
                    name="contact_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest">Manager Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="담당자 성함" {...field} className="bg-background/50 border-white/10 rounded-none" />
                        </FormControl>
                        <FormMessage className="text-[10px] font-bold uppercase" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contact_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase tracking-widest">Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="example@company.com" {...field} className="bg-background/50 border-white/10 rounded-none" />
                          </FormControl>
                          <FormMessage className="text-[10px] font-bold uppercase" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contact_phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase tracking-widest">Phone Number *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="010-XXXX-XXXX" 
                              {...field} 
                              onChange={(e) => field.onChange(formatPhone(e.target.value))}
                              className="bg-background/50 border-white/10 rounded-none"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px] font-bold uppercase" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full h-14 bg-primary text-primary-foreground font-black rounded-none skew-x-[-12deg] transition-all group"
              >
                <span className="skew-x-[12deg] flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      INITIALIZING...
                    </>
                  ) : (
                    <>
                      START PROTOCOL
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
