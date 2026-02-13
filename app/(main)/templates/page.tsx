import { createClient } from "@/utils/supabase/server";
import { fetchTemplatesByPath } from "@/features/fetchTemplatesByPath";
import { CategoryTag } from "@/components/(main)/templates/CategoryTag";
import { fetchCategory } from "@/features/fetchCategory";
import { TemplateSection } from "@/components/common/TemplateSection";

export default async function TemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?:string }>;
}) {
  const supabase = await createClient();
  const { category: currentPath, sort: currentSort = "popular"} = await searchParams;
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
    <CategoryTag items={subCategories} />
    </TemplateSection>
  );
}