import { SupabaseClient } from "@supabase/supabase-js";
import { TemplateDetail } from "@/types/template";

export async function fetchTemplateBySlug(
  supabase: SupabaseClient, 
  slug: string
): Promise<TemplateDetail | null> {
  const { data: template, error } = await supabase
    .from("templates")
    .select(`
      id, 
      title,
      slug,
      thumbnail_url, 
      view_count, 
      download_count,
      description,
      creator:users!creator_id(name),
      category:categories!inner(path)
    `)
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Template fetch error:", error);
    return null;
  }

  return template as unknown as TemplateDetail;
}