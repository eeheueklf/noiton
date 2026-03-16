import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react"; // SVG 대신 아이콘 라이브러리로 다이어트

interface CategoryNavProps {
  items: { name: string; path: string }[];
  basePath?: string;
}

export function CategoryNav({ items, basePath = "/templates" }: CategoryNavProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
      {basePath === "/templates" && (
        <Link href="/templates" className="hover:text-black transition-colors">전체</Link>
      )}
      
      {items.map((bc, index) => (
        <React.Fragment key={bc.path}>
          {(basePath === "/templates" || index > 0) && (
            <ChevronRight size={12} className="text-gray-300" strokeWidth={3} />
          )}
          
          <Link 
            href={bc.path === "#" ? "#" : `${basePath}?category=${bc.path}`}
            className={`hover:text-black transition-colors ${
              index === items.length - 1 ? "text-black font-medium" : ""
            }`}
          >
            {bc.name}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}