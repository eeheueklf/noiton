"use client";

import Link from "next/link";
import { Heart, Upload, CheckCircle2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";


export default function AccountDropDown({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
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

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-[#e6e6e6] rounded-xl shadow-xl py-2 z-[60] animate-in fade-in zoom-in duration-200">
          <div className="px-4 py-2 border-b border-gray-100 mb-1">
            <p className="text-[12px] text-gray-500 italic">내 계정</p>
            <p className="text-[14px] font-bold truncate">{session.user?.email}</p>
          </div>
          <button className="w-full flex items-center gap-2 px-4 py-2 text-[14px] text-gray-700 hover:bg-[#f5f5f5] transition-colors">
            <User className="w-4 h-4" /> 프로필 설정
          </button>
          <Link href={'/heart'} className="w-full flex items-center gap-2 px-4 py-2 text-[14px] text-gray-700 hover:bg-[#f5f5f5] transition-colors">
              <Heart className="w-4 h-4" /> 찜한 템플릿
          </Link>
          <Link href={'/heart'} className="w-full flex items-center gap-2 px-4 py-2 text-[14px] text-gray-700 hover:bg-[#f5f5f5] transition-colors">
              <Upload className="w-4 h-4" /> 업로드한 템플릿
          </Link>
          <button 
            onClick={() => signOut()}
            className="w-full flex items-center gap-2 px-4 py-2 text-[14px] text-red-600 hover:bg-[#f5f5f5] transition-colors"
          >
            <LogOut className="w-4 h-4" /> 로그아웃
          </button>
        </div>
      )}
    </div>
  );
}