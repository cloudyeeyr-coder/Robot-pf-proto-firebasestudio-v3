
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex container mx-auto px-4 pt-24 gap-8">
        <Sidebar role="admin" />
        <main id="main-content" className="flex-1 py-8 overflow-hidden">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
