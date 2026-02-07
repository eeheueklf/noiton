"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; 

interface Category {
  id: string;
  name: string;
  path: string;
  parent_id: string | null;
  level: number;
}

export function CategorySelector({ onSelect }: { onSelect: (id: string) => void }) {
  const supabase = createClient();
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  
  const [selectedLevel1, setSelectedLevel1] = useState("");
  const [selectedLevel2, setSelectedLevel2] = useState("");
  const [selectedLevel3, setSelectedLevel3] = useState("");

  useEffect(() => {
    const fetchCats = async () => {
      const { data } = await supabase
        .from("categories")
        .select("id, name, path, parent_id, level")
        .order("name");
      if (data) setAllCategories(data);
    };
    fetchCats();
  }, []);

  const level1Options = allCategories.filter((c) => c.level === 1);
  const level2Options = allCategories.filter((c) => c.parent_id === selectedLevel1);
  const level3Options = allCategories.filter((c) => c.parent_id === selectedLevel2);

  const handleLevel3Change = (id: string) => {
    setSelectedLevel3(id);
    onSelect(id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500">대분류</label>
        <select
          className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-1 focus:ring-gray-500"
          value={selectedLevel1}
          onChange={(e) => {
            setSelectedLevel1(e.target.value);
            setSelectedLevel2("");
            setSelectedLevel3("");
            onSelect("");
          }}
        >
          <option value="">대분류 선택</option>
          {level1Options.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500">중분류</label>
        <select
          disabled={!selectedLevel1}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-1 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400"
          value={selectedLevel2}
          onChange={(e) => {
            setSelectedLevel2(e.target.value);
            setSelectedLevel3("");
            onSelect("");
          }}
        >
          <option value="">중분류 선택</option>
          {level2Options.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500">소분류 (필수)</label>
        <select
          required
          disabled={!selectedLevel2}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-1 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400"
          value={selectedLevel3}
          onChange={(e) => handleLevel3Change(e.target.value)}
        >
          <option value="">소분류 선택</option>
          {level3Options.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}