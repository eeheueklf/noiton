import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

import { fetchTemplatesByPath } from "@/features/fetchTemplatesByPath";
import { CategoryTag } from "@/components/(main)/templates/CategoryTag";
import { fetchCategory } from "@/features/fetchCategory";
import { TemplateSection } from "@/components/common/TemplateSection";

export default async function TemplatesPage({
  params,
  searchParams,
}: {
  params: Promise<{category?:string[]}>; // 경로 파라미터 (/ 뒤)
  searchParams: Promise<{ sort?:string }>; // 정렬 파라미터 (? 뒤)
}) {
  const supabase = await createClient();
  const { category: categoryArray } = await params;
  const { sort: currentSort = "popular"} = await searchParams;

  const currentPath = categoryArray ? categoryArray.join('/') : "";
  
  const [categoryInfo, templates] = await Promise.all([
    fetchCategory(supabase, currentPath),
    fetchTemplatesByPath(supabase, currentPath, undefined, currentSort)
  ]);
  
  const { categoryName, subCategories, categoryPath } = categoryInfo;
  
  return (
    <TemplateSection 
      title={categoryName}
      templates={templates}
      breadcrumbItems={categoryPath}
      cols={2}
    >
    <CategoryTag items={subCategories} currentPath={currentPath}/>
    {templates.length === 0 && (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg font-medium">아직 등록된 템플릿이 없어요.</p>
        <p className="text-sm">다른 카테고리를 확인해보시겠어요?</p>
      </div>
    )}
    </TemplateSection>
  );
}