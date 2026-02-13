import { createClient } from "@/utils/supabase/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TemplateSection } from "@/components/common/TemplateSection";
import { fetchLikeByUser } from "@/features/fetchLikeByUser";

interface LikePageProps {
  searchParams: Promise<{ sort?: string }>;
}
export default async function Like({ searchParams }: LikePageProps) {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    }
    const supabase = await createClient();
    const { sort = "popular" } = await searchParams;
    const myLikeTemplates = await fetchLikeByUser(supabase, session.user.id, sort);

    return (
        <TemplateSection 
            title="찜한" 
            templates={myLikeTemplates}
        />
    );
}