"use client";

import { useSession } from "next-auth/react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import LikeButtonIcon from "./LikeButtonIcon";

export default function LikeWrapper({ templateId, initialIsLiked }: { templateId: string, initialIsLiked: boolean }) {
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
    onError: (err, _, context) => {
      queryClient.setQueryData(["templateLike", templateId], context?.previousValue);
      alert(err instanceof Error ? err.message : "오류가 발생했습니다.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["templateLike", templateId] });
      queryClient.invalidateQueries({ queryKey: ["myLikeTemplates"] }); // 목록 쿼리도 갱신
      router.refresh();
    }
  });

  const handleToggle = (e: React.MouseEvent) => {
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
      onClick={handleToggle}
      disabled={isPending}
      className="inline-flex items-center justify-center bg-white text-black px-3.5 py-3.5 rounded-md font-bold hover:bg-gray-100 shadow-sm transition-all disabled:opacity-50"
    >
      <LikeButtonIcon isLiked={!!isLiked} isPending={isPending} />
    </button>
  );
}