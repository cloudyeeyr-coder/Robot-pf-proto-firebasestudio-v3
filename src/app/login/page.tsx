
"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RoptoLogo } from "@/components/brand/RoptoLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ArrowRight, Github, Chrome, ShieldLock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    
    // 시뮬레이션: 로그인 성공 처리
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "ACCESS GRANTED",
        description: "시스템 접속 프로토콜이 승인되었습니다.",
      });
      router.push("/");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 tech-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[440px] space-y-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Link href="/">
            <RoptoLogo className="scale-110" />
          </Link>
        </div>

        <Card className="glass-panel border-primary/20 rounded-none relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse" />
          
          <CardHeader className="space-y-2 text-center pt-10">
            <div className="mx-auto w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center mb-2">
              <ShieldLock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-3xl font-black tracking-tighter uppercase italic">
              LOGIN <span className="text-primary text-glow">PROTOCOL</span>
            </CardTitle>
            <CardDescription className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
              시스템 접근 권한을 인증하십시오
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-primary">Identity (Email)</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@company.com" 
                  required 
                  className="bg-background/50 border-white/10 rounded-none focus:border-primary transition-all font-mono text-xs"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-primary">Security_Key</Label>
                  <Link href="#" className="text-[9px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest">Forgot?</Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  className="bg-background/50 border-white/10 rounded-none focus:border-primary transition-all font-mono text-xs"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="remember" className="rounded-none border-white/20 data-[state=checked]:bg-primary" />
                <Label htmlFor="remember" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest cursor-pointer">
                  Maintain Connection
                </Label>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 bg-primary text-primary-foreground font-black rounded-none skew-x-[-12deg] transition-all group mt-6"
              >
                <span className="skew-x-[12deg] flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      AUTHENTICATING...
                    </>
                  ) : (
                    <>
                      EXECUTE LOGIN
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </Button>
            </form>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]">
                <span className="bg-card px-4 text-white/20">OR_SOCIAL_ACCESS</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-12 border-white/10 rounded-none hover:bg-white/5 font-bold text-[10px] uppercase tracking-widest">
                <Chrome className="mr-2 h-4 w-4" /> Google
              </Button>
              <Button variant="outline" className="h-12 border-white/10 rounded-none hover:bg-white/5 font-bold text-[10px] uppercase tracking-widest">
                <Github className="mr-2 h-4 w-4" /> Github
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pb-10">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              계정이 없으십니까?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                INITIALIZE_NEW_ACCOUNT
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="text-center">
          <p className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">
            Secure Terminal v2.1.0 // Auth_Level: Restricted
          </p>
        </div>
      </div>
    </div>
  );
}
