"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react"; 
import { Template } from "@/types/template"
import { TemplateGrid } from "@/components/common/TemplateGrid";
import Link from "next/link";
import { TemplateCard } from "@/components/common/TemplateCard";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function TemplateList({ myTemplates }: {myTemplates:Template[]}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const toggleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleDelete = async (id:string) => {
    try {
      const {error} = await supabase
        .from("templates")
        .delete()
        .eq("id", id)

      if(error) throw error;

      alert("템플릿 삭제가 완료되었습니다.")
      setSelectedId(null);
      router.refresh();
    } catch(error:any){
        alert("삭제 중 오류가 발생했습니다.")
    }
  };

  return (
    <TemplateGrid cols={3}>
        <Link href="/upload/new"className="group flex flex-col gap-4 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer">
            <div className="relative w-full aspect-[1.78/1] flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                <Plus className="w-12 h-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <div className="flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">새 템플릿 추가하기</h3>
                <p className="text-sm text-gray-500 mt-1">나만의 노션 템플릿을 공유해보세요</p>
            </div>
        </Link>

      {myTemplates?.map((template, index) => {
        const isSelected = selectedId === template.id;
        
        return (
          <div 
            key={template.id} 
            className="relative group cursor-pointer"
            onClick={() => toggleSelect(template.id)}
            onDoubleClick={() => router.push(`/template/${template.slug}`)} 
          >
            <div className={`
              absolute inset-0 z-10 rounded-xl transition-all duration-100 
              ${isSelected 
                ? "ring-3 ring-blue-500 bg-blue-50/20" 
                : "group-hover:ring-2 group-hover:ring-gray-300"}
            `} />

            {isSelected && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if(confirm("정말 삭제하시겠습니까?")) {
                    handleDelete(template.id)
                  }
                }}
                className="absolute -top-3 -right-3 z-20 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            )}

            <TemplateCard 
                key={template.id} 
                template={template} 
                showDate={true}
                index={index}
            />
          </div>
        );
      })}
    </TemplateGrid>
  );
}