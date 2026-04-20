import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const templateService = {
    async incrementDownloadCount(templateId:string){
        const { error } = await supabase.rpc('increment_download_count', { 
            target_id: templateId 
        });
        if(error) throw error;
        return true;
    }
}

export const likeService = {
  // 1. 좋아요 여부 확인
  async checkIsLiked(userId: string, templateId: string) {
    const { data } = await supabase
      .from("likes")
      .select("*")
      .match({ user_id: userId, template_id: templateId })
      .maybeSingle();
    return !!data;
  },

  async addLike(userId: string, templateId: string) {
    const { error } = await supabase
      .from("likes")
      .insert({ user_id: userId, template_id: templateId });
    if (error) throw error;
  },

  async removeLike(userId: string, templateId: string) {
    const { error } = await supabase
      .from("likes")
      .delete()
      .match({ user_id: userId, template_id: templateId });
    if (error) throw error;
  }
};