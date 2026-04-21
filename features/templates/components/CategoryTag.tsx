import Link from "next/link";

interface CategoryItem {
  name: string;
  slug: string;
}

interface CategoryTagProps {
  items: CategoryItem[]; 
  currentPath: string;
}

export function CategoryTag({ items, currentPath }: CategoryTagProps) {  
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {items.map((sub) => {
        const newPath = currentPath ? `${currentPath}/${sub.slug}` : sub.slug;

        return (
          <Link
            key={sub.slug}
            href={`/templates/${newPath}`}
            className="px-2 py-1 text-sm font-medium text-gray-600 bg-white
            rounded hover:border-black hover:text-black hover:bg-gray-100"
          >
            {sub.name}
          </Link>
        );
      })}
    </div>
  );
}