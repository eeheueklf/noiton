import { createClient } from "@/utils/supabase/server";
import { fetchTemplatesByPath } from "@/lib/api/fetchTemplatesByPath";
import { TemplateCard } from "@/app/features/TemplateCard";
import { CategoryNav } from "@/app/features/templates/CategoryNav";
import { CategoryTag } from "@/app/features/templates/CategoryTag";

export default async function TemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const supabase = await createClient();
  const { category: currentPath } = await searchParams;

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

  const templates = await fetchTemplatesByPath(supabase, currentPath);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <header className="mb-12">
        <CategoryNav items={categoryPath} />
        <h1 className="text-3xl font-bold tracking-tight mb-8">
          {categoryName} 템플릿
        </h1>
        <CategoryTag items={subCategories} />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}