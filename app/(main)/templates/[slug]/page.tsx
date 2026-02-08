import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

import { fetchTemplateBySlug } from "@/features/fetchTemplateBySlug";
import LikeButton from "@/components/(main)/templates/[slug]/LikeButton";
import { fetchLikeBySlug } from "@/features/fetchLikeBySlug";

export default async function TemplateDetail({ 
    params 
}: { 
    params: Promise<{ slug: string }> 
}) {
    const { slug } = await params;
    const supabase = await createClient();

    console.log(slug)
    const [template, initialIsLiked] = await Promise.all([
        fetchTemplateBySlug(supabase, slug),
        fetchLikeBySlug(supabase, slug)
    ])
    if (!template)  return notFound();
    

    return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
        <header className="mb-7">
            <div className="flex items-start justify-between px-1">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold tracking-tight group-hover:underline">{template.title}</h1>
                    <p className="text-[13px] text-gray-500 mt-1">{template.creator.name || "Unknown Creator"}</p>
                </div>
                <div className="flex items-center space-x-1 text-gray-400">
                    {/* 하트버튼 */}
                    <LikeButton templateId={template.id} initialIsLiked={initialIsLiked} />
                    {/* 복제 버튼 */}
                    <Link href={template.notion_page_id} target="_blank" className="inline-flex items-center justify-center bg-black text-white px-3.5 py-3.5 rounded-md font-bold hover:bg-gray-800 transition-all shadow-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    </Link>
                    
                </div>
            </div>
        </header>

        <div className="mb-12">
            <div className="border border-gray-200 aspect-[1.78/1] bg-gray-50 rounded-xl overflow-hidden shadow-sm">
                <img 
                    src={template.thumbnail_url} 
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
