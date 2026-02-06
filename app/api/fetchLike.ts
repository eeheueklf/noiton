import { SupabaseClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function fetchLike(
  supabase: SupabaseClient, 
  templateId : string,
): Promise<boolean> {
    
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return false;
    }
    const { data, error } = await supabase
    .from("likes")
    .select("template_id") 
    .eq("user_id", session.user.id)
    .eq("template_id", templateId)
    .maybeSingle(); 

  return !!data;
}