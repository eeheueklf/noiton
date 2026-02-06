import { createClient } from "@/utils/supabase/server";
import { TemplateSection } from "@/components/(main)/like/TemplateSection";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchLikeByUser } from "@/features/fetchLikeByUser";

export default async function Like() {
    const session = await getServerSession(authOptions);
    const supabase = await createClient();
    
    if (!session) {
        redirect("/login");
    }

    const myLikeTemplates = await fetchLikeByUser(supabase, session.user.id)
    
    return (
        <div className="min-h-screen bg-white text-[#1e1e1e]">
        <TemplateSection 
            title="찜한 템플릿" 
            templates={myLikeTemplates} 
        />
        </div>
    );
}