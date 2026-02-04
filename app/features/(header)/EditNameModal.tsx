"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface EditNameModalProps {
  currentName: string;
  onClose: () => void;
  onUpdate: (newName: string) => Promise<void>;
}

export default function EditNameModal({ currentName, onClose, onUpdate }: EditNameModalProps) {
  const [newName, setNewName] = useState(currentName);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async () => {
    setIsUpdating(true);
    await onUpdate(newName);
    setIsUpdating(false);
  };

  return (
    <div className="absolute inset-0 bg-white z-[110] animate-in slide-in-from-right duration-300 p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <h4 className="text-lg font-bold">이름 변경</h4>
      </div>

      <div className="flex-1 space-y-4">
        <label className="text-[12px] font-bold text-gray-500 uppercase">새로운 이름</label>
        <input 
          type="text" 
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          autoFocus
          disabled={isUpdating}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-black rounded-xl outline-none transition-all font-bold text-lg disabled:opacity-50"
          placeholder="이름을 입력하세요"
        />
        <p className="text-[12px] text-gray-400">서비스 내에서 표시되는 이름입니다.</p>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={onClose}
          disabled={isUpdating}
          className="flex-1 py-4 bg-gray-100 font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          취소
        </button>
        <button 
          disabled={isUpdating}
          className="flex-1 py-4 bg-black text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors disabled:bg-gray-400"
          onClick={handleSubmit}
        >
          {isUpdating ? "변경 중..." : "변경 완료"}
        </button>
      </div>
    </div>
  );
}