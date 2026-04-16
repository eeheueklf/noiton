import { createClient } from "@/utils/supabase/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchTemplatesByUser } from "@/features/fetchTemplatesByUser";
import { CategoryNav } from "@/components/(main)/templates/CategoryNav";
import { TemplateCard } from "@/components/common/TemplateCard";
import { TemplateGrid } from "@/components/common/TemplateGrid";
import { TemplateSort } from "@/components/common/TemplateSort";

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
        <TemplateGrid cols={3}>
            {myTemplates?.map((template, index) => (
            <TemplateCard 
                key={template.id} 
                template={template} 
                showDate={true}
                index={index}
            />
            ))}
        </TemplateGrid>
        </section>
    );
}



// {showAddCard && (
//           <Link href="/upload/new"className="group flex flex-col gap-4 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer">
//             <div className="relative w-full aspect-[1.78/1] flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
//               <Plus className="w-12 h-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
//             </div>
//             <div className="flex flex-col">
//               <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">새 템플릿 추가하기</h3>
//               <p className="text-sm text-gray-500 mt-1">나만의 노션 템플릿을 공유해보세요</p>
//             </div>
//           </Link>
//         )}