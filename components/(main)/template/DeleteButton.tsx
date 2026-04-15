"use client"

import { createClient } from "@/utils/supabase/client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";



export default function DeleteButton({ userId, templateId }: { userId: string, templateId: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const supabase = createClient();
    const { userInfo } = useSelector((state: RootState) => state.user);

    const handleDelete = async () => {
        if (!confirm("정말 이 템플릿을 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.")) return;
        setIsDeleting(true);
        if(userId !== userInfo?.id) return null;
        try {
            const {error} = await supabase
                .from("templates")
                .delete()
                .eq("id", templateId)

            if(error) throw error;

            alert("템플릿 삭제가 완료되었습니다.")
            router.push('/upload');
            router.refresh();
        } catch(error:any){
            alert("삭제 중 오류가 발생했습니다.")
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className={`px-3.5 py-3.5`}
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );
}