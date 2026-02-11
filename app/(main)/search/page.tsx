import { TemplateCard } from "@/components/common/TemplateCard";
import { TemplateSection } from "@/components/common/TemplateSection";
import { fetchTemplatesBySearch } from "@/features/fetchTemplatesBySearch";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q: query = "", sort = "latest" } = await searchParams;
  const supabase = await createClient();
  
  const templates = query 
    ? await fetchTemplatesBySearch(supabase, query, sort)
    : [];

  return (
          <TemplateSection isDashboard={true} title={`${templates.length}개의 결과`} templates={templates}/>

    // <div className="max-w-[1200px] mx-auto px-6 py-16">
    //   <header className="mb-12">
    //     <div className="flex items-end justify-between border-b border-gray-200 pb-6">
    //       <div>
    //         <span className="text-blue-600 font-medium text-sm">검색 결과</span>
    //         <h1 className="text-3xl font-bold mt-2">
    //           {templates.length}개의 결과
    //         </h1>
    //       </div>

    //       <div className="flex gap-4 text-sm font-medium">
    //         <Link 
    //           href={`?q=${query}&sort=latest`}
    //           className={sort === 'latest' ? 'text-black font-bold' : 'text-gray-400'}
    //         >
    //           최신순
    //         </Link>
    //         <Link 
    //           href={`?q=${query}&sort=popular`}
    //           className={sort === 'popular' ? 'text-black font-bold' : 'text-gray-400'}
    //         >
    //           인기순
    //         </Link>
    //       </div>
    //     </div>
    //   </header>

    //   {templates.length > 0 ? (
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
    //       {templates.map((template) => (
    //         <TemplateCard key={template.id} template={template} keyword={query}/>
    //       ))}
    //     </div>
    //   ) : (
    //     <div className="py-20 text-center">
    //       <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
    //       <Link href="/templates" className="text-blue-600 underline mt-4 inline-block">
    //         전체 템플릿 보러가기
    //       </Link>
    //     </div>
    //   )}
    // </div>
  );
}