
import { useState } from "react";
import { templateService } from "@/features/template/services/templateService";

export function useDownloadTemplate({ url, templateId }: { url: string, templateId: string }){
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDownload = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      await templateService.incrementDownloadCount(templateId);
    } catch{
        alert('링크를 불러올 수 없습니다.')
    }
    finally {
      window.open(url, '_blank');
      setIsUpdating(false);
    }
  };
  return {
    isUpdating,
    handleDownload,
  };
}