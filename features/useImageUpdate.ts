"use client";

import { createClient } from "@/utils/supabase/client";

export function useImageUpdate() {
  const supabase = createClient();

  const updateProfileImage = async (file: File, userId: string, currentImageUrl: string | null) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;

    try {
      if (currentImageUrl?.includes("profile-images")) {
        const oldFileName = currentImageUrl.split("/").pop();
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

      return publicUrl;
    } catch (err) {
      console.error("이미지 업로드 프로세스 에러:", err);
      throw err;
    }
  };

const removeProfileImage = async (currentImageUrl: string | null) => {
  try {
    if (currentImageUrl?.includes("profile-images")) {
      const lastPart = currentImageUrl.split("/").pop();
      if (lastPart) {
        const fileName = lastPart.split("?")[0]; 
        
        console.log("삭제 시도 파일명:", fileName);
        
        const { error } = await supabase.storage
          .from("profile-images")
          .remove([fileName]);

        if (error) throw error;
      }
    }
    return null;
  } catch (err) {
    console.error("이미지 제거 에러:", err);
    throw err;
  }
};

  return { updateProfileImage, removeProfileImage };
}