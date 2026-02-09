import { Template } from "@/types/template";
import { TemplateCard } from "@/components/common/TemplateCard";
import { Image as ImageIcon, ChevronRight } from "lucide-react";

export function TemplateSection({ title, templates }: { title: string; templates: Template[];}) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12">
      <header className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>대시보드</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-black font-medium">{title}</span>
          </div>
          <h1 className="text-3xl font-bold">{title}</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </section>
  );
}