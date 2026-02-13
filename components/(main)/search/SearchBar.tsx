"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export function HomeSearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="relative group w-full max-w-[320px] mx-auto"
    >
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors pointer-events-none">
        <Search size={18} strokeWidth={2.5} />
      </div>

      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="어떤 템플릿을 찾으시나요?" 
        className="w-full py-3 pl-12 pr-6 rounded-full bg-[#f5f5f5] text-[14px] outline-none transition-all focus:bg-white focus:ring-1 focus:ring-black border-none" 
      />
    </form>
  );
}