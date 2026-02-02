import Link from "next/link";

import { createClient } from "@/utils/supabase/server";
import { Template } from "@/types/template";
import { TemplateCard } from "@/app/features/TemplateCard";

export default async function TemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;

  let categoryName = "모든";
  let subCategories : {name:string; slug:string;path:string}[]=[];
  if (params.category) {
    const { data: currentCat } = await supabase
      .from("categories")
      .select("id, name, path")
      .eq("path", params.category)
      .single();

    if (currentCat) {
      categoryName = currentCat.name;

      const { data: subCats } = await supabase
        .from("categories")
        .select("name, slug, path")
        .eq("parent_id", currentCat.id)
        .order("name");
      
      subCategories = subCats || [];
    }
  }

  let query = supabase
    .from("templates")
    .select(`
      id, title, thumbnail_url, view_count, download_count, 
      creator:users!creator_id(name),
      category:categories!inner(path, name)
    `);

  if (params.category) {
    query = query.like("category.path", `${params.category}%`);
  }

  const { data } = await query.order("download_count", { ascending: false });
  const templates = (data as unknown as Template[]) || [];

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-bold">
          {categoryName} 템플릿
        </h1>
      
        {subCategories.map((sub) => {
          const isActive = params.category === sub.path;

          return (
            <Link
              key={sub.slug}
              href={`/templates?category=${sub.path}`}
              className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all ${
                isActive 
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black"
              }`}
            >
              {sub.name}
            </Link>
          );
        })}
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      {templates.length === 0 && (
        <div className="py-32 text-center">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-gray-400">아직 등록된 {categoryName} 템플릿이 없습니다.</p>
        </div>
      )}
    </div>
  );
}