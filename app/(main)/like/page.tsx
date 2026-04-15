"use client"

import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { TemplateSection } from "@/components/common/TemplateSection";
import { createClient } from "@/utils/supabase/client";
import { fetchLikeByUser } from "@/features/fetchLikeByUser";
import { use } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; 
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

interface LikePageProps {
  searchParams: Promise<{ sort?: string }>;
}
export default function LikePage({ searchParams }: LikePageProps) {
    const supabase = createClient();
    const { userInfo, isLoggedIn } = useSelector((state: RootState) => state.user);
    
    const resolvedSearchParams = use(searchParams);
    const sort = resolvedSearchParams.sort || "popular";

    if (!isLoggedIn) {
        redirect("/login");
        return null;
    }

    if (!userInfo) {
        return <LoadingSpinner />; 
    }

    const { data: myLikeTemplates } = useQuery({
        queryKey: ["myLikeTemplates", userInfo?.id, sort],
        queryFn: () => fetchLikeByUser(supabase, userInfo?.id as string, sort),
        enabled: !!userInfo?.id,
        staleTime: 0,
    });

    
    return (
        <TemplateSection 
            title="찜한 템플릿" 
            templates={myLikeTemplates || []}
        />
    );
}