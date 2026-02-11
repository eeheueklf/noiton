import { createClient } from "@/utils/supabase/server";
import { TemplateSection } from "@/components/common/TemplateSection";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchTemplatesByUser } from "@/features/fetchTemplatesByUser";

interface UploadPageProps {
  searchParams: Promise<{ sort?: string }>;
}
export default async function Upload({ searchParams }: UploadPageProps) {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        redirect("/login");
    }
    
    const supabase = await createClient();
    const { sort = "popular" } = await searchParams;

    const myTemplates = await fetchTemplatesByUser(supabase, session.user.id, sort)
    
    return (
        <div className="min-h-screen bg-white text-[#1e1e1e]">
        <TemplateSection 
            title="업로드한" 
            templates={myTemplates} 
            showAddCard={true}
            isDashboard={true}
            currentPath="/upload"
            currentSort={sort}
        />
        </div>
    );
}