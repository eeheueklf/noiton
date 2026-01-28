import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();

  // 1. 카테고리와 템플릿 데이터 가져오기
  const { data: categories } = await supabase.from("Category").select("*");
  // app/page.tsx
const { data: templates, error } = await supabase
  .from("Template")
  .select(`
    *,
    User (
      name,
      image
    )
  `)
  .order("createdAt", { ascending: false });

if (error) {
  console.error("❌ 에러 발생:", error.message);
} else {
  console.log("✅ 데이터 로드 성공! 템플릿 개수:", templates?.length);
  console.log("샘플 데이터 하나:", templates?.[0]);
}
  return (
    <div className="min-h-screen bg-white text-black">
      {/* --- Hero Section --- */}
      <section className="py-20 px-6 text-center bg-[#f5f5f5]">
        <h1 className="text-5xl font-bold mb-6">Explore Notion Templates</h1>
        <div className="max-w-2xl mx-auto relative">
          <input 
            type="text" 
            placeholder="Search for templates, creators..." 
            className="w-full p-4 pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-5 top-5 text-gray-400">🔍</span>
        </div>
      </section>

      {/* --- Category Bar --- */}
      <nav className="sticky top-0 bg-white border-b z-10 overflow-x-auto no-scrollbar">
        <div className="flex space-x-8 px-10 py-4 whitespace-nowrap justify-center">
          <button className="font-semibold border-b-2 border-black">All</button>
          {categories?.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/category/${cat.slug}`}
              className="text-gray-500 hover:text-black transition"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* --- Template Grid --- */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates?.map((template) => (
            <div key={template.id} className="group cursor-pointer">
              {/* Thumbnail */}
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mb-3 relative">
                {template.thumbnailUrl ? (
                  <img src={template.thumbnailUrl} alt={template.title} className="object-cover w-full h-full group-hover:scale-105 transition" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                )}
              </div>
              {/* Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                    <img src={template.creator?.image || ""} alt="" />
                  </div>
                  <span className="text-sm font-medium">{template.title}</span>
                </div>
                <div className="flex items-center text-gray-400 text-xs">
                  <span>❤️ {template.viewCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}