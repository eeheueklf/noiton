import Link from "next/link";

interface TemplateSortProps {
  categoryName: string;
  currentPath?: string;
  currentSort: string;
}

export function TemplateSort({ categoryName, currentPath, currentSort }: TemplateSortProps) {
  const basePath = `?category=${currentPath || ""}`;

  return (
    <div className="flex items-end justify-between mb-8">
      <h1 className="text-3xl font-bold tracking-tight">
        {categoryName} 템플릿
      </h1>
      
      <div className="flex gap-4 text-sm font-medium text-gray-500">
        <Link 
          href={`${basePath}&sort=latest`}
          className={`${currentSort === 'latest' ? 'text-black font-bold' : 'hover:text-black'}`}
        >
          최신순
        </Link>
        <span className="text-gray-300">|</span>
        <Link 
          href={`${basePath}&sort=popular`}
          className={`${currentSort === 'popular' ? 'text-black font-bold' : 'hover:text-black'}`}
        >
          인기순
        </Link>
      </div>
    </div>
  );
}