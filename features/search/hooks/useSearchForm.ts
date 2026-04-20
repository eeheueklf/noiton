import { useState } from "react";
import { useRouter } from "next/navigation";

export function useSearchForm(){
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };
  return {
    query,
    setQuery,
    handleSearch,
  };
}