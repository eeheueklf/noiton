"use client";

import { useCategory } from "../hooks/useCategory";




export function CategorySelector({ onSelect }: { onSelect: (id: string) => void }) {
  const {options, selectedLevels, selectLevel1, selectLevel2, selectLevel3} = useCategory();
  const handleLevel3Change = (id: string) => {
      selectLevel3(id);
      onSelect(id);
    }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500">대분류</label>
        <select
          className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-1 focus:ring-gray-500"
          value={selectedLevels.lvl1}
          onChange={(e) => {
            selectLevel1(e.target.value);
            onSelect("");
          }}
        >
          <option value="">대분류 선택</option>
          {options.level1.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500">중분류</label>
        <select
          disabled={!selectedLevels.lvl1}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-1 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400"
          value={selectedLevels.lvl2}
          onChange={(e) => {
            selectLevel2(e.target.value);
            onSelect("");
          }}
        >
          <option value="">중분류 선택</option>
          {options.level2.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500">소분류 (필수)</label>
        <select
          required
          disabled={!selectedLevels.lvl2}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-1 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400"
          value={selectedLevels.lvl3}
          onChange={(e) => handleLevel3Change(e.target.value)}
        >
          <option value="">소분류 선택</option>
          {options.level3.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}