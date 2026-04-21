import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";

interface NavItem {
  name: string;
  path: string;
}

interface CategoryNavProps {
  items: NavItem[];
  basePath?: string;
}

function NavLink({
  item,
  href,
  isLast
}:{
  item:NavItem;
  href:string;
  isLast:boolean
}){
  return (
    <Link 
      href={href}
      className={`hover:text-black transition-colors ${
        isLast ? "text-black font-medium" : ""
      }`}
    >
      {item.name}
    </Link>
  )
}

export function CategoryNav({ items, basePath = "/templates" }: CategoryNavProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
      <Link href="/templates" className="hover:text-black transition-colors">전체</Link>
      {items.map((item, index) => (
        <React.Fragment key={item.path}>
          <ChevronRight size={12} className="text-gray-300" strokeWidth={3} />
          <NavLink 
            item={item} 
            href={item.path === "#" ? "#" : `${basePath}/${item.path}`} 
            isLast={index === items.length - 1}
          />
        </React.Fragment>
      ))}
    </nav>
  );
}