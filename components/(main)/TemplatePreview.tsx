import Link from "next/link";
import { Template } from "@/types/template";
import { TemplateGrid } from "@/components/common/TemplateGrid";

interface TemplatePreviewProps{
    title:string;
    subtitle?:string;
    templates:Template[];
    href?:string;
}

export function TemplatePreview({
    title,
    subtitle,
    templates,
    href,
}: TemplatePreviewProps){
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
            <h2 className="text-[20px] font-bold tracking-tight">{title}</h2>
            <span className="hidden sm:block text-[13px] text-gray-400 font-medium">{subtitle}</span>
            </div>
            {href && (
                <Link href={href} className="group flex items-center text-[14px] font-bold text-[#E1C198] hover:text-[#866837] transition-colors gap-1">
                더보기
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5"><path d="m9 18 6-6-6-6" /></svg>
                </Link>
            )}
        </div>
        <TemplateGrid templates={templates}/>
    </section>
  );
}