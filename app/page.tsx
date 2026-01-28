import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();

  const { data: templates } = await supabase
    .from("Template")
    .select(`
      *,
      creator:creatorid (
        name,
        image
      )
    `)
    .order("createdat", { ascending: false });

  return (
    <div className="min-h-screen bg-white text-[#1e1e1e]">

  <section className="pt-16 pb-12 px-6 "> 
    <div className="max-w-[1200px] mx-auto text-center">
      <img 
        src="/search.png" 
        alt="Search Icon"
        className="mx-auto w-100 mb-4 object-contain transition-transform duration-500 hover:scale-110" 
      />
      
      <h1 className="text-[22px] font-bold tracking-tight mb-6" style={{ fontFamily: 'NanumHuman, sans-serif' }}>
        노션 템플릿, 커버 사진, 아이콘 검색
      </h1>
      
      {/* 검색창 */}
      <div className="max-w-[300px] mx-auto relative group ">
        {/* 아이콘 */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
        </div>
        <input 
          type="text" 
          placeholder="검색어를 입력하세요..." 
          className="w-full py-[10px] pl-12 pr-6 rounded-[30px] border-none bg-[#f5f5f5] text-[15px] shadow-sm focus:ring-2 focus:ring-black outline-none transition-all" 
        />
      </div>
    </div>
  </section>

  </div>
  );
}