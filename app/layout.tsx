import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Providers } from "@/components/providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased text-[#1e1e1e]">
        <ThemeProvider>
          <Providers>
            {children}
          </Providers> 
        </ThemeProvider>
      </body>
    </html>
  );
}