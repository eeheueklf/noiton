import { Template } from "@/types/template";
import { TemplateCard } from "@/app/features/(main)/TemplateCard";

export function TemplateSection({ title, subtitle, templates, href }: { title: string; subtitle: string; templates: Template[]; href: string }) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-[20px] font-bold tracking-tight">{title}</h2>
          <span className="hidden sm:block text-[13px] text-gray-400 font-medium">{subtitle}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </section>
  );
}