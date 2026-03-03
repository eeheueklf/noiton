"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import LikeButtonIcon from "@/components/(main)/template/LikeButtonIcon";

export function LikeStatus({ templateId }: { templateId: string }) {
  const { data: session, status } = useSession();
  const supabase = createClient();

  const { data: isLiked, isLoading } = useQuery({
    queryKey: ["templateLike", templateId],
    queryFn: async () => {
      if (!session?.user?.id) return false;

      const { data, error } = await supabase
        .from("likes")
        .select("*")
        .match({ user_id: session.user.id, template_id: templateId })
        .maybeSingle();

      if (error) return false;
      return !!data;
    },
    enabled: status === "authenticated", 
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="flex items-center">
      <LikeButtonIcon isLiked={!!isLiked} isPending={status === "loading" || isLoading} />
    </div>
  );
}