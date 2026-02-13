import { createClient } from "@/utils/supabase/server";
import { fetchTemplatesByPath } from "@/features/fetchTemplatesByPath";
import { CategoryNav } from "@/components/(main)/templates/CategoryNav";
import { CategoryTag } from "@/components/(main)/templates/CategoryTag";
import { TemplateSort } from "@/components/common/TemplateSort";
import { fetchCategory } from "@/features/fetchCategory";
import { TemplateGrid } from "@/components/common/TemplateGrid";

export default async function TemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?:string }>;
}) {
  const supabase = await createClient();
  const { category: currentPath, sort:sortParam} = await searchParams;
  const currentSort = sortParam || "popular";

  const [categoryInfo, templates] = await Promise.all([
    fetchCategory(supabase, currentPath),
    fetchTemplatesByPath(supabase, currentPath, undefined, currentSort)
  ]);
  
  const { categoryName, subCategories, categoryPath } = categoryInfo;

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16">
      <header className="mb-7">
        <CategoryNav items={categoryPath} />
        <div className="flex items-end justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {categoryName} 템플릿
          </h1>
          <TemplateSort/>
        </div>
        <CategoryTag items={subCategories} />
      </header>

      <TemplateGrid templates={templates} cols={2}/>
    </section>
  );
}