import Link from "next/link";
import { TemplateCard } from "@/components/common/TemplateCard";
import { Template } from "@/types/template";
import { Image as ImageIcon, ChevronRight } from "lucide-react";
import { Plus } from "lucide-react";
import { CategoryNav } from "@/components/(main)/templates/CategoryNav";
import { TemplateGrid } from "@/components/common/TemplateGrid";
import { TemplateSort } from "@/components/(main)/templates/TemplateSort";

interface TemplateSectionProps{
    title:string;
    subtitle?:string;
    templates:Template[];
    href?:string;
    isDashboard?:boolean;
    showAddCard?:boolean;
    isMore?:boolean;
    breadcrumbItems?: { name: string; path: string }[];
    currentPath?: string;
    currentSort?: string; 
}

export function TemplateSection({
    title,
    subtitle,
    templates,
    href,
    isDashboard,
    showAddCard,
    isMore,
    breadcrumbItems,
    currentPath = "/",
    currentSort = "latest",
}: TemplateSectionProps){
  const defaultDashboardItems = [{ name: title, path: "#" }];
  const resultCount = templates.length;

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16">
        {isDashboard && (
            <header className="mb-7">
              <CategoryNav items={breadcrumbItems || defaultDashboardItems}/>
              <TemplateSort categoryName={title} currentPath={currentPath} currentSort={currentSort}/>
              {/* <h1 className="text-3xl font-bold">{title}</h1> */}
            </header>
        )}
        {isMore && (
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
        )}
      <TemplateGrid templates={templates} showAddCard={showAddCard}/>
    </section>
  );
}