import { createClient } from "@/utils/supabase/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchTemplatesByUser } from "@/features/fetchTemplatesByUser";
import { CategoryNav } from "@/features/templates/components/CategoryNav";
import { TemplateCard } from "@/components/common/TemplateCard";
import { TemplateGrid } from "@/components/common/TemplateGrid";
import { TemplateSort } from "@/components/common/TemplateSort";
import { Plus } from "lucide-react";
import Link from "next/link";
import TemplateList from "@/features/upload/components/TemplateList";

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
    
    const title = "업로드한 템플릿 "
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
        <TemplateList myTemplates={myTemplates}/>
        </section>
    );
}



