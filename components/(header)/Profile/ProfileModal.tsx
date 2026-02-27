"use client";

import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { X, Loader2 } from "lucide-react";
import { useUserUpdate } from "@/features/useUserUpdate";
import { useImageUpdate } from "@/features/useImageUpdate"; 
import EditNameModal from "@/components/(header)/Profile/EditNameModal";
import DeleteAccount from "@/components/(header)/Profile/DeleteAccount";

export default function ProfileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void;}) {
  const { updateName, updateImage } = useUserUpdate();
  const { updateProfileImage, removeProfileImage } = useImageUpdate();
  const { userInfo, isLoggedIn } = useSelector((state: RootState) => state.user);
  
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleNameUpdate = useCallback(async (newName: string) => {
    setIsUpdating(true);
    await updateName(newName);
    setIsEditingName(false);
    setIsUpdating(false);
  }, [updateName]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userInfo?.id) return;

    setIsUpdating(true);
    try {
      const publicUrl = await updateProfileImage(file, userInfo.id, userInfo.image || null);
      await updateImage(publicUrl);
    } catch (err) {
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageRemove = async () => {
    if (!userInfo || !userInfo.id) return;

    if (!confirm("사진을 제거할까요?")) return;
    
    setIsUpdating(true);
    try {
      await removeProfileImage(userInfo.image ?? null); 
      await updateImage(null); 
      
      console.log("DB 업데이트까지 완료!");
    } catch (err) {
      console.error("제거 중 에러 발생:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;
  if (!isLoggedIn || !userInfo || !userInfo.id) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={isEditingName || isUpdating ? undefined : onClose} 
      />
      
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold">프로필 설정</h3>
          <button onClick={onClose} disabled={isUpdating} className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-50">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              <img 
                src={userInfo.image || "/default-avatar.png"} 
                className={`w-24 h-24 rounded-lg shadow-sm object-cover border border-gray-100 transition-opacity ${isUpdating ? 'opacity-50' : ''}`} 
                alt="Avatar" 
              />
              {isUpdating && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <input 
                type="file" 
                id="avatar-upload" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
                disabled={isUpdating}
              />
              <label 
                htmlFor="avatar-upload" 
                className={`text-[13px] font-semibold text-blue-600 hover:text-blue-700 cursor-pointer ${isUpdating ? 'pointer-events-none opacity-50' : ''}`}
              >
                사진 변경하기
              </label>
              {userInfo.image && !isUpdating && (
                <button 
                  onClick={handleImageRemove} 
                  className="text-[13px] font-semibold text-gray-400 hover:text-red-500 transition-colors"
                >
                  제거
                </button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">계정 이메일</label>
              <p className="mt-1 text-[15px] text-gray-600 font-medium">{userInfo.email}</p>
            </section>

            <section>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">사용자 이름</label>
              <div className="flex items-center justify-between">
                <p className="mt-1 text-[15px] text-gray-600 font-medium">{userInfo.name}</p>
                <button 
                  onClick={() => setIsEditingName(true)}
                  disabled={isUpdating}
                  className="text-[11px] font-bold text-blue-400 hover:text-blue-500 uppercase tracking-wider disabled:opacity-50"
                >
                  변경하기
                </button>
              </div>
            </section>

            <div className="pt-4 border-t border-gray-100 text-center">
              <button 
                onClick={() => setIsDeletingAccount(true)}
                disabled={isUpdating}
              >
                <p className="text-[12px] font-bold text-red-400 hover:text-red-600 transition-colors uppercase disabled:opacity-50">서비스 탈퇴하기</p>
              </button>
            </div>
          </div>
        </div>

        {isEditingName && (
          <EditNameModal 
            currentName={userInfo.name || ""} 
            onClose={() => setIsEditingName(false)}
            onUpdate={handleNameUpdate}
          />
        )}

        {isDeletingAccount && (
          <DeleteAccount 
            userId={userInfo.id}
            onClose={() => setIsDeletingAccount(false)} 
          />
        )}
      </div>
    </div>
  );
}