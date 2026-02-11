import { SupabaseClient } from "@supabase/supabase-js";
import { Template } from "@/types/template";
import { withTemplateSort } from "@/utils/sort";

export async function fetchTemplatesByUser(
  supabase: SupabaseClient, 
  userId: string,
  sort="popular",
): Promise<Template[]> {
    let query = supabase
    .from("templates")
    .select(`
        id, 
        title,
        slug,
        thumbnail_url, 
        created_at,
        download_count,
        likes_count:likes(count)
    `)
    .eq("creator_id", userId);

    query = withTemplateSort(query, sort);
    const { data, error } = await query;

    if (error) {
        console.error("Fetch error:", error);
        return [];
    }

  return (data?.map((item: any) => ({
        ...item,
        creator: Array.isArray(item.creator) ? item.creator[0] : item.creator,
        category: Array.isArray(item.category) ? item.category[0] : item.category,
    })) || []) as Template[];
}