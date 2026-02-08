import { createClient } from "@/utils/supabase/server";
import { fetchTemplatesByPath } from "@/features/fetchTemplatesByPath";
import { TemplateCard } from "@/components/(main)/TemplateCard";
import { CategoryNav } from "@/components/(main)/templates/CategoryNav";
import { CategoryTag } from "@/components/(main)/templates/CategoryTag";

export default async function TemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?:string }>;
}) {
  const supabase = await createClient();
  const { category: currentPath, sort:sortParam} = await searchParams;
  const currentSort = sortParam || "popular";

  let categoryName = "모든";
  let subCategories: any[] = [];
  let categoryPath: any[] = [];

  if (currentPath) {
    const segments = currentPath.split('.');
    const pathsToFetch = segments.map((_, i) => segments.slice(0, i + 1).join('.'));

    const { data: pathData } = await supabase
      .from("categories")
      .select("id, name, path")
      .in("path", pathsToFetch);

    if (pathData) {
      categoryPath = pathsToFetch
        .map(p => pathData.find(d => d.path === p))
        .filter(Boolean);
      
      const currentCat = categoryPath[categoryPath.length - 1];
      categoryName = currentCat.name;

      const { data: lowCategories } = await supabase
        .from("categories")
        .select("name, slug, path")
        .eq("parent_id", currentCat.id)
        .order("name");
      
      subCategories = lowCategories || [];
    }
  } else {
    const { data: rootCategory } = await supabase
      .from("categories")
      .select("name, slug, path")
      .eq("level", 1)
      .order("name");
    subCategories = rootCategory || [];
  }

  const templates = await fetchTemplatesByPath(supabase, currentPath, undefined, currentSort);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
            <header className="mb-7">
        <CategoryNav items={categoryPath} />
        
        <div className="flex items-end justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {categoryName} 템플릿
          </h1>
          
          <div className="flex gap-4 text-sm font-medium text-gray-500">
            <a 
              href={`?category=${currentPath || ""}&sort=latest`}
              className={`${currentSort === 'latest' ? 'text-black font-bold' : 'hover:text-black'}`}
            >
              최신순
            </a>
            <span className="text-gray-300">|</span>
            <a 
              href={`?category=${currentPath || ""}&sort=popular`}
              className={`${currentSort === 'popular' ? 'text-black font-bold' : 'hover:text-black'}`}
            >
              인기순
            </a>
          </div>
        </div>

        <CategoryTag items={subCategories} />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}