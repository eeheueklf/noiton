import Link from "next/link";
import { TemplateCard } from "@/components/common/TemplateCard";
import { Template } from "@/types/template";
import { Plus, SearchX } from "lucide-react";
import { TemplateGrid } from "@/components/common/TemplateGrid";

interface SearchTemplateGridProps{
  templates:Template[];
  keyword?:string;
  recommand: Template[];
}

export function SearchTemplateGrid({
  templates,
  keyword,
  recommand,
}: SearchTemplateGridProps){

  if (templates.length === 0) {
    return (
      <div className="w-full">
        <div className="flex flex-col items-center justify-center min-h-[300px] py-16 text-center border-gray-100 mb-16">
          <div className="bg-gray-50 p-6 rounded-full mb-4">
            <SearchX className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {keyword ? `"${keyword}"에 대한 결과가 없습니다` : "등록된 템플릿이 없습니다"}
          </h3>
          <p className="text-gray-500 mt-2 text-sm">
            다른 검색어를 입력하거나 아래의 인기 템플릿을 확인해 보세요.
          </p>
        </div>
        {recommand.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-8 text-gray-900">이런 템플릿은 어떠세요?</h2>   
            <TemplateGrid cols={3}>    
                {recommand.map((template, index) => (
                    <TemplateCard 
                    key={template.id} 
                    template={template} 
                    // showDate={showAddCard}
                    // keyword={keyword}
                    index={index}
                    />
                ))}
            </TemplateGrid>
          </>
        )}
      </div>
    );
  }

  return (
    <TemplateGrid cols={3}>    
        {templates.map((template, index) => (
            <TemplateCard 
            key={template.id} 
            template={template} 
            // showDate={showAddCard}
            keyword={keyword}
            index={index}
            />
        ))}
    </TemplateGrid>
  );
}