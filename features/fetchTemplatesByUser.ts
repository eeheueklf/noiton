import { SupabaseClient } from "@supabase/supabase-js";
import { Template } from "@/types/template";

export async function fetchTemplatesByUser(
  supabase: SupabaseClient, 
  userId: string,
): Promise<Template[]> {
    const { data, error } = await supabase
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

    console.log(data)

    console.log(userId)
    if (error) {
        console.error("Error fetching liked templates:", error);
        return [];
    }  

  return (data?.map((item: any) => ({
        ...item,
        creator: Array.isArray(item.creator) ? item.creator[0] : item.creator,
        category: Array.isArray(item.category) ? item.category[0] : item.category,
    })) || []) as Template[];
}