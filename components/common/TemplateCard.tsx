import Link from "next/link";
import { Template } from "@/types/template";
import { formatRelativeDate } from "@/lib/utils"
import { HighlightText } from "@/components/(main)/search/HighlightText";
import { Heart, Copy } from "lucide-react";


interface TemplateCardProps {
    template: Template;
    keyword?: string;
    showDate?: boolean;
}

export function TemplateCard({
    template,
    keyword,
    showDate = false
}: TemplateCardProps){

  const titleContent = keyword 
    ? <HighlightText text={template.title} keyword={keyword} /> 
    : template.title;

  const subText = showDate 
    ? formatRelativeDate(template.created_at) 
    : template.creator.name || "알 수 없음";

  return (
    <div className="group cursor-pointer">        
      <Link href={`/templates/${template.slug}`}>
        <div className="border border-gray-200 aspect-[1.78/1] bg-gray-50 rounded-[8px] overflow-hidden mb-4">
          <img src={template.thumbnail_url} alt={template.title} className="object-cover w-full h-full" />
        </div>
      </Link>

      <div className="flex items-start justify-between px-1">
        <div className="flex flex-col">
          <h3 className="text-[15px] font-bold leading-tight group-hover:underline truncate">
            {titleContent}
          </h3>
          <p className="text-[13px] text-gray-500 mt-1">{subText}</p> 
        </div>
        <div className="flex items-center space-x-1 text-gray-400">
          <Heart size={14} /><span className="text-[13px] font-medium">{template.likes_count?.[0].count || 0}</span>
          <Copy size={14} /><span className="text-[13px] font-medium">{template.download_count || 0}</span>
        </div>
      </div>
    </div>
  );
}

