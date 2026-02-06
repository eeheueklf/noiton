import Link from "next/link";
import { Template } from "@/types/template";

export function TemplateCard({ template }: { template: Template }) {
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
          <h3 className="text-[15px] font-bold leading-tight group-hover:underline">{template.title}</h3>
          {/* <p className="text-[13px] text-gray-500 mt-1">{template.creator.name || "Unknown Creator"}</p> */}
        </div>
      </div>
    </div>
  );
}

