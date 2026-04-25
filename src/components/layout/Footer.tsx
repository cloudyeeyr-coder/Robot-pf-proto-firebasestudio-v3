import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold text-primary tracking-tight">
              RoboSI Connect
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              로봇 SI 파트너의 신뢰를 데이터로 증명하고,<br />
              수요기업에게는 안심 보증을 제공하는<br />
              국내 1위 로봇 자동화 매칭 플랫폼입니다.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">서비스</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><Link href="/search" className="hover:text-primary">SI 파트너 찾기</Link></li>
                <li><Link href="/calculator" className="hover:text-primary">비용 시뮬레이션</Link></li>
                <li><Link href="/escrow-info" className="hover:text-primary">에스크로 안내</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">고객지원</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><Link href="/notice" className="hover:text-primary">공지사항</Link></li>
                <li><Link href="/faq" className="hover:text-primary">자주 묻는 질문</Link></li>
                <li><Link href="/contact" className="hover:text-primary">문의하기</Link></li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">사업자 정보</h4>
            <address className="text-xs text-muted-foreground not-italic space-y-1">
              <p>(주)로보SI커넥트 | 대표: 김철수</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>서울특별시 강남구 테헤란로 123, 45층</p>
              <p>통신판매업신고: 제 2026-서울강남-0001호</p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 로봇 SI 안심 보증 매칭 플랫폼. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary underline-offset-4 hover:underline">이용약관</Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary underline-offset-4 hover:underline font-bold">개인정보처리방침</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}