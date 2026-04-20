import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { likeService } from "../services/templateService";

export function useLikeTemplate({ templateId, initialIsLiked }: {templateId:string, initialIsLiked:boolean}){
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const userId = session?.user?.id;

  const { data: isLiked } = useQuery({
    queryKey: ["templateLike", templateId],
    queryFn: () => (userId ? likeService.checkIsLiked(userId, templateId) : false),
    initialData: initialIsLiked,
    enabled: !!userId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (nextLiked: boolean) => {
      if (!userId) throw new Error("로그인이 필요합니다.");
      return nextLiked
        ? likeService.addLike(userId, templateId)
        : likeService.removeLike(userId, templateId);

    },
    // 낙관적 업데이트
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
    
    if (status === "unauthenticated") 
        return alert("로그인이 필요한 서비스입니다.");
    
    if (isPending) return;
    mutate(!isLiked);
  };

  return{
    isLiked,
    isPending,
    toggleLike
  }
}