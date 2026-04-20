import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const templateService = {
    async deleteTemplate(id:string){
        const { error } = await supabase
            .from("templates")
                .delete()
                .eq("id", id)
        
        if(error) throw error;
    }
}
