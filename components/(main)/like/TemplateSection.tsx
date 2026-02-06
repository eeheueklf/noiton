import { Template } from "@/types/template";
import { TemplateCard } from "@/components/(main)/TemplateCard";

export function TemplateSection({ title, templates }: { title: string; templates: Template[];}) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight mb-4">{title}</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </section>
  );
}