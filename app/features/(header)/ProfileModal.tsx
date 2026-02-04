"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { createClient } from "@/utils/supabase/client";
import EditNameModal from "@/app/features/(header)/EditNameModal";
import DeleteAccount from "@/app/features/(header)/DeleteAccount";


export default function ProfileModal({ isOpen, onClose, session }: { isOpen: boolean; onClose: () => void; session: any }) {
  const { update } = useSession();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const supabase = createClient();

  const handleNameUpdate = async (newName: string) => {
    if (!newName.trim() || newName === session?.user?.name) {
      setIsEditingName(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("users")
        .update({ name: newName })
        .eq("id", session.user.id);

      if (error) throw error;
      await update({ name: newName });
      setIsEditingName(false);
    } catch (err) {
      console.error(err);
      alert("이름 업데이트에 실패했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
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
            <img src={session.user?.image || ""} className="w-24 h-24 rounded-lg shadow-sm object-cover" alt="Avatar" />
            <div className="flex items-center gap-3">
              <button className="text-[13px] font-semibold text-blue-600 hover:text-blue-700">사진 변경하기</button>
              <button className="text-[13px] font-semibold text-gray-400 hover:text-gray-500">제거</button>
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
                className="text-[11px] font-bold text-blue-400 hover:text-blue-500 uppercase tracking-wider"
              >
                이름 변경하기
              </button>
            </div>

            <div className="pt-4 border-t border-gray-100 text-center">
              <button onClick={() => setIsDeletingAccount(true)}>
                <p className="text-[12px] font-bold text-red-400 hover:text-red-600 transition-colors uppercase">서비스 탈퇴하기</p>
              </button>
            </div>
          </div>
        </div>

        {isEditingName && (
          <EditNameModal 
            currentName={session.user?.name || ""} 
            onClose={() => setIsEditingName(false)}
            onUpdate={handleNameUpdate}
          />
        )}

        {isDeletingAccount && (
          <DeleteAccount 
            userId={session.user.id}
            onClose={() => setIsDeletingAccount(false)} 
          />
        )}
      </div>
    </div>
  );
}