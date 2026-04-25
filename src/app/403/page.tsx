import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function AccessDenied() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center">
          <ShieldAlert className="h-12 w-12 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">접근 권한이 없습니다</h1>
          <p className="text-muted-foreground">
            죄송합니다. 요청하신 페이지를 볼 수 있는 권한이 없습니다. 
            올바른 계정으로 로그인했는지 확인하시거나 관리자에게 문의하세요.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              홈으로 돌아가기
            </Link>
          </Button>
          <Button asChild>
            <Link href="/login">다른 계정으로 로그인</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}