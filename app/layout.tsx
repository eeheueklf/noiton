import "./globals.css";
import { Providers } from "@/app/features/providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased text-[#1e1e1e]">
        <Providers>{children}</Providers> 
      </body>
    </html>
  );
}