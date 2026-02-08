"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function HomeSearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="max-w-[300px] mx-auto relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
      </div>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="어떤 템플릿을 찾으시나요?" 
        className="w-full py-[10px] pl-12 pr-6 rounded-[30px] border-none bg-[#f5f5f5] text-[15px] shadow-sm outline-none transition-all focus:ring-1 focus:ring-black" 
      />
    </form>
  );
}