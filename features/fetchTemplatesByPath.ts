import { SupabaseClient } from "@supabase/supabase-js";
import { Template } from "@/types/template";

export async function fetchTemplatesByPath(
  supabase: SupabaseClient, 
  pathPrefix?: string,
  limit?: number,
  sort="popular",
): Promise<Template[]> {
  let query = supabase
      .from("templates")
      .select(`
        id, 
        title,
        slug,
        thumbnail_url, 
        download_count,
        creator:users!creator_id(name),
        category:categories!inner(path),
        likes_count:likes(count)
      `);
  if (pathPrefix) {
    query = query.like("category.path", `${pathPrefix}%`);
  }

  if (sort === "popular") {
    query = query.order("download_count", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  if(limit){
    query = query.limit(limit)
  }

  const { data, error } = await query;

  if (error) {
    console.error("Fetch error:", error);
    return [];
  }

  return (data as unknown as Template[]) || [];
}