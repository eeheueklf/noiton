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
      <TemplateGrid templates={templates} cols={3} keyword={keyword}/>
      {templates.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-lg font-medium">검색된 템플릿이 없어요.</p>
          <p className="text-sm">다른 검색어를 확인해보시겠어요?</p>
        </div>
      )}
    </div>
  );
}