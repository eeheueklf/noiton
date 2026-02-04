import { createClient } from "@/utils/supabase/server";
import { TemplateSection } from "@/app/features/TemplateSection";
import { fetchTemplatesByPath } from "@/lib/api/fetchTemplatesByPath";

export default async function Home() {
  const supabase = await createClient();

  const CATEGORY_CONFIG = [
    { path: "work", label: "업무 관련", subtitle: "생산성을 높여주는" },
    { path: "personal", label: "개인 관련", subtitle: "일상을 기록하는" },
    { path: "money", label: "자산 관리", subtitle: "똑똑하게 모으는" },
    { path: "interest", label: "취미/관심", subtitle: "취미 기록용" },
  ];

  const [popularTemplates, ...categoryDataSets] = await Promise.all([
    fetchTemplatesByPath(supabase, undefined, 3),
    ...CATEGORY_CONFIG.map((cat) => fetchTemplatesByPath(supabase, cat.path, 3)),
  ]);

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
          
          <div className="max-w-[300px] mx-auto relative group ">
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

      <TemplateSection 
        title="인기 템플릿" 
        subtitle="가장 많이 찾는 템플릿" 
        templates={popularTemplates} 
        href="/templates?sort=popular" 
      />

      {CATEGORY_CONFIG.map((config, index) => (
        <TemplateSection 
          key={config.path}
          title={`${config.label} 템플릿`} 
          subtitle={`${config.subtitle} 템플릿`} 
          templates={categoryDataSets[index]}
          href={`/templates?category=${config.path}`} 
        />
      ))}
    </div>
  );
}