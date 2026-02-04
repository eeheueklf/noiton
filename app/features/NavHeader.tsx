"use client";

import { useState, useRef, useEffect } from "react"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut, User, Settings } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[14px] font-medium transition-colors hover:bg-[#f5f5f5] group"
              >
                <img src={session.user?.image || ""} className="w-5 h-5 rounded-sm" alt="Profile" />
                <div className="flex items-center gap-1">
                  <span>{session.user?.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>
              </button>

              {/* 프로필 드롭다운 창 */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#e6e6e6] rounded-xl shadow-xl py-2 z-[60] animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-2 border-b border-gray-100 mb-1">
                    <p className="text-[12px] text-gray-500 italic">내 계정</p>
                    <p className="text-[14px] font-bold truncate">{session.user?.email}</p>
                  </div>
                  
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-[14px] text-gray-700 hover:bg-[#f5f5f5] transition-colors">
                    <User className="w-4 h-4" /> 프로필 설정
                  </button>
                  
                  <button 
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-2 px-4 py-2 text-[14px] text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> 로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href={'/login'} className="px-4 py-2 text-[14px] font-medium hover:bg-[#f5f5f5] rounded-lg transition">
              로그인
            </Link>
          )}
          <button className="px-4 py-2 text-[14px] font-medium bg-black text-white rounded-lg hover:bg-[#2c2c2c] transition shadow-sm">
            업로드
          </button>
        </div>
      </div>
    </header>
  );
}