"use client";

import { useState } from "react";
import { ChevronRight, AlertTriangle, Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { createClient } from "@/utils/supabase/client";

interface DeleteAccountProps {
  userId: string;
  onClose: () => void;
}

export default function DeleteAccount({ userId, onClose }: DeleteAccountProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const supabase = createClient();

  const handleDeleteAccount = async () => {
    if (confirmText !== "탈퇴하기") return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", userId);

      if (error) throw error;

      alert("계정이 삭제되었습니다. 이용해 주셔서 감사합니다.");
      await signOut({ callbackUrl: "/" }); 

    } catch (err) {
      console.error(err);
      alert("탈퇴 처리 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-white z-[120] animate-in slide-in-from-right duration-300 p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <h4 className="text-lg font-bold">서비스 탈퇴</h4>
      </div>

      <div className="flex-1 space-y-6">
        <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
          <div className="text-[13px] text-red-800 leading-relaxed">
            <p className="font-bold mb-1">정말 탈퇴하시겠어요?</p>
            <p>계정을 삭제하면 프로필, 설정 등 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[12px] font-bold text-gray-500 uppercase">
            확인을 위해 아래에 <span className="text-red-500">"탈퇴하기"</span>를 입력해주세요
          </label>
          <input 
            type="text" 
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="탈퇴하기"
            className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-red-500 rounded-xl outline-none transition-all font-bold"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-auto">
        <button 
          onClick={onClose}
          disabled={isDeleting}
          className="flex-1 py-4 bg-gray-100 font-bold rounded-xl hover:bg-gray-200 transition-colors"
        >
          취소
        </button>
        <button 
          disabled={isDeleting || confirmText !== "탈퇴하기"}
          onClick={handleDeleteAccount}
          className="flex-1 py-4 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors disabled:bg-gray-200 disabled:text-gray-400 flex items-center justify-center gap-2"
        >
          {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : "영구 탈퇴"}
        </button>
      </div>
    </div>
  );
}