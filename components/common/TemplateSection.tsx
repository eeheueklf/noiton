import Link from "next/link";
import { Template } from "@/types/template";
import { CategoryNav } from "@/components/(main)/templates/CategoryNav";
import { TemplateGrid } from "@/components/common/TemplateGrid";
import { TemplateSort } from "@/components/(main)/templates/TemplateSort";

interface TemplateSectionProps{
    title:string;
    templates:Template[];
    showAddCard?:boolean;
    breadcrumbItems?: { name: string; path: string }[];
    currentPath?: string;
    currentSort?: string; 
}

export function TemplateSection({
    title,
    templates,
    showAddCard,
    breadcrumbItems,
    currentPath = "/",
    currentSort = "latest",
}: TemplateSectionProps){
  const defaultDashboardItems = [{ name: title, path: "#" }];

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16">
      <header className="mb-7">
        <CategoryNav items={breadcrumbItems || defaultDashboardItems}/>
        <TemplateSort categoryName={title} currentPath={currentPath} currentSort={currentSort}/>
        {/* <h1 className="text-3xl font-bold">{title}</h1> */}
      </header>
      <TemplateGrid templates={templates} showAddCard={showAddCard}/>
    </section>
  );
}