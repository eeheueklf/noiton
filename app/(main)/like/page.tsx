"use client"

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { TemplateSection } from "@/components/common/TemplateSection";
import { createClient } from "@/utils/supabase/client";
import { fetchLikeByUser } from "@/features/fetchLikeByUser";
import { use } from "react";


interface LikePageProps {
  searchParams: Promise<{ sort?: string }>;
}
export default function LikePage({ searchParams }: LikePageProps) {
    const { data: session, status } = useSession();
    const supabase = createClient();
    
    const resolvedSearchParams = use(searchParams);
    const sort = resolvedSearchParams.sort || "popular";

    if (status === "unauthenticated") {
        redirect("/login");
    }

    const { data: myLikeTemplates } = useQuery({
        queryKey: ["myLikeTemplates", session?.user?.id, sort],
        queryFn: () => fetchLikeByUser(supabase, session?.user?.id as string, sort),
        enabled: !!session?.user?.id,
        staleTime: 0,
    });

    
    return (
        <TemplateSection 
            title="찜한 템플릿" 
            templates={myLikeTemplates || []}
        />
    );
}