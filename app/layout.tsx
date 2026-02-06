import "./globals.css";
import { Providers } from "@/components/providers";

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