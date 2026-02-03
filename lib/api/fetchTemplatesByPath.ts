import { SupabaseClient } from "@supabase/supabase-js";
import { Template } from "@/types/template";

export async function fetchTemplatesByPath(
  supabase: SupabaseClient, 
  pathPrefix?: string,
  limit?: number
): Promise<Template[]> {
  let query = supabase
      .from("templates")
      .select(`
        id, 
        title,
        slug,
        thumbnail_url, 
        view_count, 
        download_count, 
        creator:users!creator_id(name),
        category:categories!inner(path)
      `);
  if (pathPrefix) {
    query = query.like("category.path", `${pathPrefix}%`);
  }

  if(limit){
    query = query.limit(limit)
  }

  const { data, error } = await query.order("download_count", { ascending: false })

  if (error) {
    console.error("Fetch error:", error);
    return [];
  }

  return (data as unknown as Template[]) || [];
}