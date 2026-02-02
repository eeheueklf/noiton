import Link from "next/link";

export function CategoryTag({ items }: { items: { name: string; slug: string; path: string }[] }) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {items.map((sub) => (
        <Link
          key={sub.slug}
          href={`/templates?category=${sub.path}`}
          className="px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 transition-all hover:border-black hover:text-black bg-white active:scale-95"
        >
          {sub.name}
        </Link>
      ))}
    </div>
  );
}