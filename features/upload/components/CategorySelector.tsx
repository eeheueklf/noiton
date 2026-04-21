"use client";

import { Category } from "@/types/template";
import { useCategory } from "../hooks/useCategory";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export function CategorySelector({ onSelect }: { onSelect: (id: string) => void }) {
  const {options, selectedLevels, selectLevel1, selectLevel2, selectLevel3, isLoading} = useCategory();
  if(isLoading) return <LoadingSpinner/>

  const handleLevelChange = (setter: (id: string) => void, value: string) => {
    setter(value);
    onSelect("");
  };
  const handleLevel3Change = (id: string) => {
    selectLevel3(id);
    if(!id){
      onSelect("");
      return;
    }
    onSelect(id);
  };
  
  const optionSelect = (
    label: string,
    value: string,
    onChange: (val:string) => void,
    data: Category[],
    disabled:boolean,
  )=>(
    <div className="space-y-2">
      <label htmlFor={label} className="text-xs font-medium text-gray-500">{label}</label>
      <select
        id={label}
        className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-1 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400"
        value={value}
        onChange={(e) => { onChange(e.target.value) }}
        disabled={disabled}
      >
        <option value="">{label} 선택</option>
        {data.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
    </div>
    )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {optionSelect("대분류", selectedLevels.lvl1, (val) => handleLevelChange(selectLevel1, val), options.level1, false)}
      {optionSelect("중분류", selectedLevels.lvl2, (val) => handleLevelChange(selectLevel2, val), options.level2, !selectedLevels.lvl1)}
      {optionSelect("소분류", selectedLevels.lvl3, handleLevel3Change, options.level3, !selectedLevels.lvl2)}
    </div>
  );
}