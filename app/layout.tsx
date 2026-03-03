import "./globals.css";
import { Providers } from "@/components/providers";
import { Metadata } from "next"; 

export const metadata: Metadata = {
  title: {
    default: "Noiton - 노이톤",
    template: "%s | 노션 템플릿 마켓",
  },
  description: "업무, 자산 관리, 취미까지 삶의 질을 높여주는 노션 템플릿을 만나보세요.",
  keywords: ["노션", "노션 템플릿", "Notion", "생산성", "가계부", "다이어리"],
  authors: [{ name: "uk" }],
  openGraph: {
    title: "노션 템플릿 공유",
    description: "삶을 체계적으로 관리하는 최고의 방법",
    url: "https://noitoner.vercel.app", // 실제 배포될 도메인 주소
    siteName: "Noiton",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noiton | 노션 템플릿 공유",
    description: "최고의 노션 템플릿을 공유하고 다운로드하세요.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification:{
    google: "9o-XkIRvwtMu57Q-oQTUsmLMuT7z3rXF42QvVy4HpWU"
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased text-[#1e1e1e]">
          <Providers>
            {children}
          </Providers> 
      </body>
    </html>
  );
}