import { SupabaseClient } from "@supabase/supabase-js";

export async function fetchTemplatesBySearch(
  supabase: SupabaseClient,
  query: string,
  sort = "latest"
) {
  let q = supabase
    .from("templates")
    .select(`
      id, title, slug, thumbnail_url, download_count, created_at,
      creator:users!creator_id(name),
      category:categories!inner(name, path)
    `)
    .ilike("title", `%${query}%`); 

  if (sort === "popular") {
    q = q.order("download_count", { ascending: false });
  } else {
    q = q.order("created_at", { ascending: false });
  }

  const { data, error } = await q;
  return data || [];
}