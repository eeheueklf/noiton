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
    .order("createdat", { ascending: false })
    .limit(3);

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
          placeholder="어떤 템플릿을 찾으시나요?" 
          className="w-full py-[10px] pl-12 pr-6 rounded-[30px] border-none bg-[#f5f5f5] text-[15px] shadow-sm outline-none transition-all
          focus:ring-1 focus:ring-black" 
        />
      </div>
    </div>
  </section>



  <section className="max-w-[1200px] mx-auto px-6 py-12">
    {/* 템플릿 section 제목 */}
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <h2 className="text-[20px] font-bold tracking-tight">인기 템플릿</h2>
        <span className="hidden sm:block text-[13px] text-gray-400 font-medium">가장 많이 찾는 템플릿</span>
      </div>
      <Link 
        href="/templates" 
        className="group flex items-center text-[14px] font-bold text-[#E1C198] hover:text-[#866837] transition-colors gap-1"
      >
        더보기
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </Link>
    </div>

    {/* 템플릿 section 3줄 GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {templates?.map((template) => (
        <div key={template.id} className="group cursor-pointer">
          {/* 썸네일 */}
          <div className="aspect-[1.78/1] bg-gray-50 rounded-[8px] overflow-hidden border border-none mb-4">
            {template.thumbnailurl ? (
              <img 
                src={template.thumbnailurl} 
                alt={template.title} 
                className="object-cover w-full h-full" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 font-medium italic">Notion Template</div>
            )}
          </div>

          {/* 카드 정보 */}
          <div className="flex items-start justify-between px-1">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col">
                <h3 className="text-[15px] font-bold leading-tight group-hover:underline">{template.title}</h3>
                <p className="text-[13px] text-gray-500 mt-1">{template.creator?.name || "Unknown Creator"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-gray-400"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span className="text-[13px] font-medium">{template.viewcount || 0}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              <span className="text-[13px] font-medium">{template.downloadCount || 0}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
  
  </div>
  );
}