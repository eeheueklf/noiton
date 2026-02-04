import Link from "next/link";

export function CategoryTag({ items }: { items: { name: string; slug: string; path: string }[] }) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {items.map((sub) => (
        <Link
          key={sub.slug}
          href={`/templates?category=${sub.path}`}
          className="px-2 py-1 text-sm font-medium text-gray-600 bg-white
          rounded hover:border-black hover:text-black hover:bg-gray-100"
        >
          {sub.name}
        </Link>
      ))}
    </div>
  );
}