import { createClient } from "@/utils/supabase/server";
import { TemplateSort } from "@/components/common/TemplateSort";
import { fetchTemplatesBySearch } from "@/features/fetchTemplatesBySearch";
import { SearchTemplateGrid } from "@/components/(main)/search/SearchTemplateGrid";
import { fetchTemplatesByPath } from "@/features/fetchTemplatesByPath";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q: keyword = "", sort = "popular" } = await searchParams;
  const supabase = await createClient();
  const [templates, recTemplates] = await Promise.all([
    fetchTemplatesBySearch(supabase, keyword, sort),
    fetchTemplatesByPath(supabase, undefined, 3) // 추천용 3개
  ]);
  
  return (
    <div className="max-w-[1200px] w-full mx-auto px-6 py-16">
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

      <SearchTemplateGrid templates={templates} keyword={keyword} recommand={recTemplates}/>
    </div>
  );
}