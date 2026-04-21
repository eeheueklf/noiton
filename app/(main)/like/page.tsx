"use client"

import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { fetchLikeByUser } from "@/features/fetchLikeByUser";
import { use } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; 
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { TemplateCard } from "@/components/common/TemplateCard";
import { TemplateGrid } from "@/components/common/TemplateGrid";
import { TemplateSort } from "@/components/common/TemplateSort";
import { CategoryNav } from "@/features/templates/components/CategoryNav";

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

    const title = "찜한 템플릿 "
    const defaultPath = [{ name: title, path: "#" }];
    return (
    <section className="max-w-[1200px] w-full mx-auto px-6 py-16">
      <header className="mb-7">
        <CategoryNav items={defaultPath}/>
        <div className="flex items-end justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <TemplateSort/>
        </div>
      </header>
      <TemplateGrid cols={3}>
        {myLikeTemplates?.map((template, index) => (
          <TemplateCard 
            key={template.id} 
            template={template} 
            // showDate={showAddCard}
            // keyword={keyword}
            index={index}
          />
        ))}
      </TemplateGrid>
    </section>
    );
}