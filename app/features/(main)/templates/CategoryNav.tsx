import Link from "next/link";
import React from "react";

export function CategoryNav({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
      <Link href="/templates" className="hover:text-black transition-colors">전체</Link>
      {items.map((bc, index) => (
        <React.Fragment key={bc.path}>
          <span className="text-[10px] select-none text-gray-300">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
          <Link 
            href={`/templates?category=${bc.path}`}
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