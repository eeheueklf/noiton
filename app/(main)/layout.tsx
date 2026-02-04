import NavHeader from "@/app/features/(header)/NavHeader";
import { Providers } from "@/app/features/providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        {/* 네비게이션 - 헤더 */}
        <NavHeader /> 
        
        {/* 컨텐츠 영역 */}
        <main className="flex flex-col min-h-[calc(100vh-64px)]">
          <Providers>{children}</Providers>
        </main>

        {/* footer */}
        <footer className="border-t border-[#e6e6e6] py-12 px-6">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[#b3b3b3] text-[13px]">
            <p>© 2026 Noiton. All rights reserved</p>
          </div>
        </footer>
    </>
  );
}