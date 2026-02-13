import { createClient } from "@/utils/supabase/server";
import { TemplateSort } from "@/components/common/TemplateSort";
import { fetchTemplatesBySearch } from "@/features/fetchTemplatesBySearch";
import { TemplateGrid } from "@/components/common/TemplateGrid";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q: keyword = "", sort = "popular" } = await searchParams;
  const supabase = await createClient();
  const templates = keyword 
    ? await fetchTemplatesBySearch(supabase, keyword, sort)
    : [];
  
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <header className="mb-12">
        <div className="flex items-end justify-between border-b border-gray-200 pb-6">
          <div>
            <span className="text-blue-600 font-medium text-sm">검색 결과</span>
            <h1 className="text-3xl font-bold mt-2">
              {templates.length}개의 결과
            </h1>
          </div>
          <TemplateSort/>
          
        </div>
      </header>

      <TemplateGrid templates={templates} cols={3} keyword={keyword}/>
    </div>
  );
}