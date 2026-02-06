"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import AccountDropDown from "./AccountDropdown";

export default function NavHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navLinks = [
    { name: "템플릿", href: "/" },
    { name: "커버", href: "/cover" },
    { name: "아이콘", href: "/icon" },
    { name: "피드", href: "/feed" },
  ];

  return (
    <header className="h-[64px] border-b border-[#e6e6e6] bg-white sticky top-0 z-[50]">
      <div className="max-w-[1200px] h-full mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-[24px] tracking-tighter hidden sm:block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              NOITON
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-[14px] font-medium transition-colors ${
                  pathname === link.href ? "bg-[#f5f5f5] text-black" : "text-[#666] hover:bg-[#f5f5f5] hover:text-black"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {session ? (
            <AccountDropDown session={session}/>
          ) : (
            <Link href={'/login'} className="px-4 py-2 text-[14px] font-medium hover:bg-[#f5f5f5] rounded-lg transition">
              로그인
            </Link>
          )}
          <Link href={'/upload'} className="px-4 py-2 text-[14px] font-medium bg-black text-white rounded-lg hover:bg-[#2c2c2c] transition shadow-sm">
            업로드
          </Link>
        </div>
      </div>
    </header>
  );
}