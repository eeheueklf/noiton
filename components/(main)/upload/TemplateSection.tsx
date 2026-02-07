import Link from "next/link";
import { Plus } from "lucide-react";
import { Template } from "@/types/template";
import { TemplateCard } from "@/components/(main)/upload/TemplateCard";

export function TemplateSection({ title, templates }: { title: string; templates: Template[];}) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight mb-4">{title}</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* 새 템플릿 추가 카드 */}
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

        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </section>
  );
}