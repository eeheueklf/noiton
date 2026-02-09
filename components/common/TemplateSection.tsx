import Link from "next/link";
import { TemplateCard } from "@/components/common/TemplateCard";
import { Template } from "@/types/template";
import { Image as ImageIcon, ChevronRight } from "lucide-react";
import { Plus } from "lucide-react";

interface TemplateSectionProps{
    title:string;
    subtitle?:string;
    templates:Template[];
    href?:string;
    isDashboard?:boolean;
    showAddCard?:boolean;
    isMore?:boolean;
    columns?:2|3;
}

export function TemplateSection({
    title,
    subtitle,
    templates,
    href,
    isDashboard,
    showAddCard,
    isMore,
    columns=3
}: TemplateSectionProps){
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12">
        {isDashboard && (
            <header className="mb-10">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>대시보드</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-black font-medium">{title}</span>
              </div>
              <h1 className="text-3xl font-bold">{title}</h1>
            </header>
        )}
        {isMore && (
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                <h2 className="text-[20px] font-bold tracking-tight">{title}</h2>
                <span className="hidden sm:block text-[13px] text-gray-400 font-medium">{subtitle}</span>
                </div>
                <Link href={href} className="group flex items-center text-[14px] font-bold text-[#E1C198] hover:text-[#866837] transition-colors gap-1">
                더보기
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5"><path d="m9 18 6-6-6-6" /></svg>
                </Link>
            </div>
        )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {/* 새 템플릿 추가 카드 */}
        {showAddCard && (
          <Link 
            href="/upload/new"
            className="group flex flex-col gap-4 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer"
          >
            <div className="relative w-full aspect-[1.78/1] flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
              <Plus className="w-12 h-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">
                새 템플릿 추가하기
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                나만의 노션 템플릿을 공유해보세요
              </p>
            </div>
          </Link>
        )}
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} showDate={showAddCard}/>
        ))}
      </div>
    </section>
  );
}