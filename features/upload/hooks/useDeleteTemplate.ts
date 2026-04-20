
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { templateService } from "../services/templateService";

export function useDeleteTemplate(){
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const toggleSelect = (id: string) => {
        setSelectedId((prev) => (prev === id ? null : id));
    };
  
    const handleDelete = async (id:string) => {
        if (isDeleting) return;
        setIsDeleting(true);

        try {
            await templateService.deleteTemplate(id);
            alert("템플릿 삭제가 완료되었습니다.")
            setSelectedId(null);
            router.refresh();
        } catch(error:any){
            alert("삭제 중 오류가 발생했습니다.")
        } finally {
            setIsDeleting(false);
        }
    };

  return{
    selectedId,
    isDeleting,
    handleDelete,
    toggleSelect
  }
}