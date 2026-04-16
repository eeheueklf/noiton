import { createClient } from "@/utils/supabase/server";
import { fetchTemplatesByPath } from "@/features/fetchTemplatesByPath";
import { CategoryTag } from "@/components/(main)/templates/CategoryTag";
import { fetchCategory } from "@/features/fetchCategory";
import { CategoryNav } from "@/components/(main)/templates/CategoryNav";
import { TemplateCard } from "@/components/common/TemplateCard";
import { TemplateGrid } from "@/components/common/TemplateGrid";
import { TemplateSort } from "@/components/common/TemplateSort";

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
    <section className="max-w-[1200px] w-full mx-auto px-6 py-16">
      <header className="mb-7">
        <CategoryNav items={categoryPath}/>
        <div className="flex items-end justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{categoryName}</h1>
          <TemplateSort/>
        </div>
      </header>
      <CategoryTag items={subCategories} currentPath={currentPath}/>
      
      {templates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-lg font-medium">아직 등록된 템플릿이 없어요.</p>
          <p className="text-sm">다른 카테고리를 확인해보시겠어요?</p>
        </div>
      ): 
      (
      <TemplateGrid cols={2}>
        {templates?.map((template, index) => (
          <TemplateCard 
            key={template.id} 
            template={template} 
            index={index}
          />
        ))}
      </TemplateGrid>

      )}
    </section>
    
  );
}