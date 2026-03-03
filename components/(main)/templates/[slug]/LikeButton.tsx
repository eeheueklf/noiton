"use client";

import { createClient } from "@/utils/supabase/client";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  templateId: string;
  initialIsLiked: boolean;
}

export default function LikeButton({ templateId, initialIsLiked }: LikeButtonProps) {
  const { data: session, status } = useSession();
  const supabase = createClient();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: isLiked } = useQuery({
    queryKey: ["templateLike", templateId],
    queryFn: async () => {
      if (!session?.user?.id) return false;
      const { data } = await supabase
        .from("likes")
        .select("*")
        .match({ user_id: session.user.id, template_id: templateId })
        .maybeSingle();
      return !!data;
    },
    initialData: initialIsLiked,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (nextLiked: boolean) => {
      const userId = session?.user?.id;
      if (!userId) throw new Error("로그인이 필요합니다.");
      
      if (nextLiked) {
        return await supabase.from("likes").insert({ user_id: userId, template_id: templateId });
      } else {
        return await supabase.from("likes").delete().match({ user_id: userId, template_id: templateId });
      }
    },
    onMutate: async (nextLiked) => {
      await queryClient.cancelQueries({ queryKey: ["templateLike", templateId] });
      const previousValue = isLiked;
      queryClient.setQueryData(["templateLike", templateId], nextLiked);
      return { previousValue };
    },
    onError: (err, nextLiked, context) => {
      queryClient.setQueryData(["templateLike", templateId], context?.previousValue);
      alert(err instanceof Error ? err.message : "오류가 발생했습니다.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["templateLike", templateId] });
      queryClient.invalidateQueries({ queryKey: ["myLikeTemplates"] });
      router.refresh(); 
    },
  });

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (status === "unauthenticated") {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    
    if (isPending) return;
    mutate(!isLiked);
  };

  return (
    <button
      onClick={toggleLike}
      disabled={isPending}
      className={`inline-flex items-center justify-center bg-white px-3.5 py-3.5 rounded-md font-bold hover:bg-gray-100 shadow-sm ${
        isLiked 
          ? "text-red-400" 
          : "text-gray-900"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
    </button>
  );
}