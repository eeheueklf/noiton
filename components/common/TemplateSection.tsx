import Link from "next/link";
import { Template } from "@/types/template";
import { CategoryNav } from "@/components/(main)/templates/CategoryNav";
import { TemplateGrid } from "@/components/common/TemplateGrid";
import { TemplateSort } from "@/components/common/TemplateSort";

interface TemplateSectionProps{
    title:string;
    templates:Template[];
    showAddCard?:boolean;
    breadcrumbItems?: { name: string; path: string }[];
}

export function TemplateSection({
    title,
    templates,
    showAddCard,
    breadcrumbItems,
}: TemplateSectionProps){
  const defaultDashboardItems = [{ name: title, path: "#" }];

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16">
      <header className="mb-7">
        <CategoryNav items={breadcrumbItems || defaultDashboardItems}/>
        <div className="flex items-end justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{title} 템플릿</h1>
          <TemplateSort/>
        </div>
      </header>
      <TemplateGrid templates={templates} showAddCard={showAddCard}/>
    </section>
  );
}