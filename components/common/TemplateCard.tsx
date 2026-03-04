import Link from "next/link";
import Image from 'next/image'
import { Template } from "@/types/template";
import { formatRelativeDate } from "@/lib/utils"
import { HighlightText } from "@/components/(main)/search/HighlightText";
import { Copy } from "lucide-react";
import { LikeStatus } from "../(main)/LikeStatus";

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
      <Link href={`/template/${template.slug}`}>
        <div className="relative border border-gray-200 aspect-[1.78/1] bg-gray-50 rounded-[8px] overflow-hidden mb-4">
          <Image 
            src={template.thumbnail_url || "/no-img.png"} 
            alt={template.title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
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
          <LikeStatus templateId={template.id}/>
            <span className="text-[13px] font-medium">{template.likes_count || 0}</span>
          <Copy size={14} /><span className="text-[13px] font-medium">{template.download_count || 0}</span>
        </div>
      </div>
    </div>
  );
}

