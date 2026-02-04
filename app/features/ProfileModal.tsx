"use client";

import { useState } from "react"; // 상태 관리 추가
import { X, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: any;
}

export default function ProfileModal({ isOpen, onClose, session }: ProfileModalProps) {
  const [isEditingName, setIsEditingName] = useState(false); // 이름 변경 팝업 상태
  const [newName, setNewName] = useState(session?.user?.name || "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={isEditingName ? () => setIsEditingName(false) : onClose} 
      />
      
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold">프로필 설정</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          <div className="flex flex-col items-center gap-3">
            <img 
              src={session.user?.image || ""} 
              className="w-24 h-24 rounded-lg shadow-sm"
              alt="Avatar"
            />
            <div className="flex items-center gap-3">
                <button className="text-[13px] font-semibold text-blue-600 hover:text-blue-700">사진 변경하기</button>
                <button className="text-[13px] font-semibold text-grey-400 hover:text-grey-500">제거</button>
                </div>
            </div>
          <div className="space-y-6">
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">계정 이메일</label>
              <p className="mt-1 text-[15px] text-gray-600 font-medium">{session.user?.email}</p>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">사용자 이름</label>
              <p className="mt-1 text-[15px] text-gray-600 font-medium">{session.user?.name}</p>
              <button 
                onClick={() => setIsEditingName(true)}
                className="text-[11px] font-bold text-blue-400 uppercase tracking-wider cursor-pointer"
              >
                이름 변경하기
              </button>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Link href="/delete" className="inline-block">
                <p className="text-[12px] font-bold text-red-400 hover:text-red-600 transition-colors uppercase">서비스 탈퇴하기</p>
              </Link>
            </div>
          </div>
        </div>

        {isEditingName && (
          <div className="absolute inset-0 bg-white z-[110] animate-in slide-in-from-right duration-300 p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-8">
              <button onClick={() => setIsEditingName(false)} className="p-1 hover:bg-gray-100 rounded-lg">
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
                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-black rounded-xl outline-none transition-all font-bold text-lg"
                placeholder="이름을 입력하세요"
              />
              <p className="text-[12px] text-gray-400">서비스 내에서 표시되는 이름입니다.</p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setIsEditingName(false)}
                className="flex-1 py-4 bg-gray-100 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button 
                className="flex-1 py-4 bg-black text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors"
                onClick={() => {
                  alert(`${newName}(으)로 변경 시도!`);
                  setIsEditingName(false);
                }}
              >
                변경 완료
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}