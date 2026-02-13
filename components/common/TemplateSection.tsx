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
    cols?:2 | 3;
  children?: React.ReactNode; 
}

export function TemplateSection({
    title,
    templates,
    showAddCard,
    breadcrumbItems,
    cols = 3,
    children,
}: TemplateSectionProps){
  const defaultPath = [{ name: title, path: "#" }];

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16">
      <header className="mb-7">
        <CategoryNav items={breadcrumbItems || defaultPath}/>
        <div className="flex items-end justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <TemplateSort/>
        </div>
        {children}
      </header>
      <TemplateGrid templates={templates} showAddCard={showAddCard} cols={cols}/>
    </section>
  );
}