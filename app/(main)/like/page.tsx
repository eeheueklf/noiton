import { createClient } from "@/utils/supabase/server";
import { TemplateSection } from "@/app/features/(main)/like/TemplateSection";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Like() {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        redirect("/login");
    }

    const supabase = await createClient();

    const { data: likedData } = await supabase
        .from("likes")
        .select("templates (*)")
        .eq("user_id", session.user.id);

        
    const myLikeTemplates = likedData?.map((d: any) => d.templates) || [];
    console.log(session.user.id)
    
    return (
        <div className="min-h-screen bg-white text-[#1e1e1e]">
        <TemplateSection 
            title="찜한 템플릿" 
            subtitle=""
            templates={myLikeTemplates} 
            href="/templates?sort=popular" 
        />
        </div>
    );
}