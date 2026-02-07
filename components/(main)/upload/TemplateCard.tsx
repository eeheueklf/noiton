import Link from "next/link";
import { Template } from "@/types/template";
import { formatRelativeDate } from "@/lib/utils"

export function TemplateCard({ template }: { template: Template }) {
  return (
    
    <Link href={`/templates/${template.slug}`} className="group flex flex-col p-4 rounded-xl hover:bg-gray-50/30 cursor-pointer">     
        <div className="border border-gray-200 aspect-[1.78/1] bg-gray-50 rounded-[8px] overflow-hidden mb-4">
            {template.thumbnail_url ? (
              <img src={template.thumbnail_url} alt={template.title} className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 font-medium italic">
                Notion Template
              </div>
            )}
        </div>
      <div className="flex items-start justify-between px-1">
        <div className="flex flex-col">
          <h3 className="text-[15px] font-bold leading-tight group-hover:underline">{template.title}</h3>
          <p className="text-[13px] text-gray-500 mt-1">{formatRelativeDate(template.created_at)}</p>
        </div>
      </div>
    </Link>
  );
}

