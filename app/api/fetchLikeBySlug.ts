import { SupabaseClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function fetchLikeBySlug(
  supabase: SupabaseClient, 
  slug : string,
): Promise<boolean> {
    
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return false;

    const { data } = await supabase
    .from("likes")
    .select(`
      template_id,
      templates!inner(slug) 
    `)
    .eq("user_id", session.user.id)
    .eq("templates.slug", slug)
    .maybeSingle(); 

  return !!data;
}