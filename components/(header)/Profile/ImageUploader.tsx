"use client";

import { createClient } from "@/utils/supabase/client";

interface ImageUploaderProps {
  currentImage: string | null;
  userId: string;
  onUpdate: (newUrl: string | null) => Promise<void>;
}

export default function ImageUploader({ currentImage, userId, onUpdate }: ImageUploaderProps) {
  const supabase = createClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;

    try {
      if (currentImage?.includes("profile-images")) {
        const oldFileName = currentImage.split("/").pop();
        if (oldFileName) {
          await supabase.storage.from("profile-images").remove([oldFileName]);
        }
      }

      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("profile-images")
        .getPublicUrl(fileName);

      await onUpdate(publicUrl);
    } catch (err) {
      console.error(err);
      alert("이미지 업로드 실패");
    }
  };

  const handleRemove = async () => {
    if (!confirm("사진을 제거할까요?")) return;
    try {
      if (currentImage?.includes("profile-images")) {
        const oldFileName = currentImage.split("/").pop();
        if (oldFileName) {
          await supabase.storage.from("profile-images").remove([oldFileName]);
        }
      }
      await onUpdate(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <img 
        src={currentImage || "/default-avatar.png"} 
        className="w-24 h-24 rounded-lg shadow-sm object-cover" 
        alt="Avatar" 
      />
      <div className="flex items-center gap-3">
        <input type="file" id="avatar-upload" accept="image/*" className="hidden" onChange={handleFileChange} />
        <label htmlFor="avatar-upload" className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
          사진 변경하기
        </label>
        <button onClick={handleRemove} className="text-[13px] font-semibold text-gray-400 hover:text-gray-500">
          제거
        </button>
      </div>
    </div>
  );
}