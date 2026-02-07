import { createClient } from "@/utils/supabase/server";
import { TemplateSection } from "@/components/(main)/upload/TemplateSection";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchTemplatesByUser } from "@/features/fetchTemplatesByUser";

export default async function Like() {
    const session = await getServerSession(authOptions);
    const supabase = await createClient();
    
    if (!session) {
        redirect("/login");
    }

    const myTemplates = await fetchTemplatesByUser(supabase, session.user.id)
    
    return (
        <div className="min-h-screen bg-white text-[#1e1e1e]">

        <TemplateSection 
            title="업로드한 템플릿" 
            templates={myTemplates} 
        />
        </div>
    );
}