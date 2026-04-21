import { CategoryDetail } from "@/types/template";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const templateService = {
    async deleteTemplate(id:string){
        const { error } = await supabase
            .from("templates")
                .delete()
                .eq("id", id)
        
        if(error) throw error;
    },

    async fetchCategories() :Promise<CategoryDetail[]>{
        const { data, error } = await supabase
            .from("categories")
            .select("id, name, path, parent_id, level")
            .order("name");
        if(error) throw error;
        return data || [];
    }
}
