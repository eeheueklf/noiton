import Link from "next/link";
import { TemplateCard } from "@/components/common/TemplateCard";
import { Template } from "@/types/template";
import { Plus } from "lucide-react";

interface TemplateGridProps{
  templates:Template[];
  cols?:2|3;
  showAddCard?:boolean;
  keyword?:string;
}

export function TemplateGrid({
  templates,
  cols=3,
  showAddCard=false,
  keyword,
}: TemplateGridProps){

  const gridStyles = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  };

  return (
      <div className={`grid ${gridStyles[cols]} gap-x-8 gap-y-12`}>
        {/* 새 템플릿 추가 카드 */}
        {showAddCard && (
          <Link href="/upload/new"className="group flex flex-col gap-4 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer">
            <div className="relative w-full aspect-[1.78/1] flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
              <Plus className="w-12 h-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">새 템플릿 추가하기</h3>
              <p className="text-sm text-gray-500 mt-1">나만의 노션 템플릿을 공유해보세요</p>
            </div>
          </Link>
        )}
        {templates.map((template) => (
          <TemplateCard 
            key={template.id} 
            template={template} 
            showDate={showAddCard}
            keyword={keyword} 
          />
        ))}
      </div>
  );
}