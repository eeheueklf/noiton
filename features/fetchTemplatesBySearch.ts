import { SupabaseClient } from "@supabase/supabase-js";
import { Template } from "@/types/template";
import { withTemplateSort } from "@/utils/sort";

export async function fetchTemplatesBySearch(
  supabase: SupabaseClient,
  keyword: string,
  sort = "latest"
) : Promise<Template[]> {
  let query = supabase
    .from("templates")
    .select(`
      id, title, slug, thumbnail_url, download_count, created_at, likes_count, popular_score,
      creator:users!creator_id(name),
      category:categories!inner(name, path)
    `)
    .ilike("title", `%${keyword}%`); 

  query = withTemplateSort(query, sort);
  const { data, error } = await query;

  if (error) {
    console.error("Search fetch error:", error);
    return [];
  }

  const formattedData = data?.map((item: any) => ({
    ...item,
    creator: Array.isArray(item.creator) ? item.creator[0] : item.creator,
    category: Array.isArray(item.category) ? item.category[0] : item.category,
  }));

  return (formattedData as unknown as Template[]) || [];
}