import Link from "next/link";
import { Template } from "@/types/template";
import { HighlightText } from "@/components/(main)/search/HighlightText";

export function TemplateCard({ template, keyword }: { template: any; keyword: string }) {
  return (
    <div className="group cursor-pointer">        
      <Link href={`/templates/${template.slug}`}>
        <div className="border border-gray-200 aspect-[1.78/1] bg-gray-50 rounded-[8px] overflow-hidden mb-4">
            {template.thumbnail_url ? (
              <img src={template.thumbnail_url} alt={template.title} className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 font-medium italic">
                Notion Template
              </div>
            )}
        </div>
      </Link>
      <div className="flex items-start justify-between px-1">
        <div className="flex flex-col">
        <h3 className="text-lg font-semibold">
            <HighlightText text={template.title} keyword={keyword} />
        </h3>          
      <p className="text-[13px] text-gray-500 mt-1">{template.creator.name || "Unknown Creator"}</p>
        </div>
        <div className="flex items-center space-x-1 text-gray-400">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
          <span className="text-[13px] font-medium">{template.view_count || 0}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
          <span className="text-[13px] font-medium">{template.download_count || 0}</span>
        </div>
      </div>
    </div>
  );
}

