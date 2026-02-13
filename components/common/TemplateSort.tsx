"use client"
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function TemplateSort() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "popular";
  const getSortLink = (sortType: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    params.set("sort", sortType);
    
    return `${pathName}?${params.toString()}`;
  };

  return (
      <div className="flex gap-4 text-sm font-medium text-gray-500">
        <Link 
          href={getSortLink('latest')}
          className={`${currentSort === 'latest' ? 'text-black font-bold' : 'hover:text-black'}`}
        >최신순</Link>
        <span className="text-gray-300">|</span>
        <Link 
          href={getSortLink('popular')}
          className={`${currentSort === 'popular' ? 'text-black font-bold' : 'hover:text-black'}`}
        >인기순</Link>
      </div>
  );
}