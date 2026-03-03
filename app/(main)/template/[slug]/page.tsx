import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

import { fetchTemplateBySlug } from "@/features/fetchTemplateBySlug";
import { fetchLikeBySlug } from "@/features/fetchLikeBySlug";
import LikeWrapper from "@/components/(main)/template/LikeWrapper";
import DownloadButton from "@/components/(main)/template/DownloadButton";

export default async function TemplateDetail({ 
    params 
}: { 
    params: Promise<{ slug: string }> 
}) {
    const { slug } = await params;
    const supabase = await createClient();

    const [template, initialIsLiked] = await Promise.all([
        fetchTemplateBySlug(supabase, slug),
        fetchLikeBySlug(supabase, slug)
    ])
    if (!template)  return notFound();
    

    return (
    <div className="max-w-[1200px] w-full mx-auto px-6 py-16">
        <header className="mb-7">
            <div className="flex items-start justify-between px-1">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold tracking-tight group-hover:underline">{template.title}</h1>
                    <p className="text-[13px] text-gray-500 mt-1">{template.creator.name || "Unknown Creator"}</p>
                </div>
                <div className="flex items-center space-x-1 text-gray-400">
                    {/* 하트버튼 */}
                    <LikeWrapper templateId={template.id} initialIsLiked={initialIsLiked} />
                    {/* 복제 버튼 */}
                    <DownloadButton url={template.notion_page_id} templateId={template.id}/>
                    
                </div>
            </div>
        </header>

        <div className="mb-12">
            <div className="border border-gray-200 aspect-[1.78/1] bg-gray-50 rounded-xl overflow-hidden shadow-sm">
                <img 
                    src={template.thumbnail_url || "/no-img.png"} 
                    alt={template.title} 
                    className="object-cover w-full h-full" 
                />
            </div>
        </div>

        <section className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 pb-2">About</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-10 whitespace-pre-wrap">
                {template.description}
            </p>
        </section>
    </div>
    );
}
