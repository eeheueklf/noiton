"use client";

import { signIn, useSession } from "next-auth/react";
import { Heart, Upload, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const benefits = [
    { icon: <Heart className="w-5 h-5 text-red-500" />, text: "나만의 템플릿 하트 찜하기" },
    { icon: <Upload className="w-5 h-5 text-blue-500" />, text: "직접 만든 템플릿 업로드" },
    { icon: <CheckCircle2 className="w-5 h-5 text-yellow-500" />, text: "무제한 다운로드 혜택" },
  ];

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    <>
    <header className="h-[64px] sticky top-0 z-[50] bg-gray-50" 
        style={{ fontFamily: 'NanumHuman, sans-serif' }}>
      <div className="max-w-full h-full mx-auto px-6 flex items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-[24px] tracking-tighter hidden sm:block" 
                      style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  NOITON
              </span>
          </Link>
      </div>
    </header>
    
    <div className="flex flex-col items-center justify-center pt-30 bg-gray-50">
      <main className="p-8 bg-white shadow rounded-3xl border border-gray-100 text-center w-full max-w-sm">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <h1 className="text-2xl font-extrabold text-gray-900 mb-2">시작하기</h1>
              <p className="text-gray-500 text-sm">로그인하고 더 많은 기능을 이용해 보세요.</p>
            </div>

            <div className="w-full bg-indigo-50/50 rounded-2xl p-5 mb-8 text-left space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    {benefit.icon}
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="flex items-center justify-center w-full gap-3 px-4 py-4 bg-white border-2 border-gray-100 rounded-2xl shadow-sm text-gray-700 font-bold hover:border-indigo-200 hover:bg-indigo-50/30 transition-all active:scale-[0.97]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google 계정으로 계속하기
            </button>
            
            <p className="mt-6 text-xs text-gray-400">
              로그인 시 이용약관 및 개인정보 처리방침에 동의하게 됩니다.
            </p>
          </div>
      </main>
    </div>
    </>
  );
}