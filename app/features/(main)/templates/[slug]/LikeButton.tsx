"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useSession } from "next-auth/react";

interface LikeButtonProps {
  templateId: string;
  initialIsLiked: boolean;
}

export default function LikeButton({ templateId, initialIsLiked }: LikeButtonProps) {
  const { data: session } = useSession();
  const supabase = createClient();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const toggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;
    if (isLoading) return;

    setIsLoading(true);
    const isCurrentlyLiked = isLiked;
    
    setIsLiked(!isCurrentlyLiked);

    try {
      if (isCurrentlyLiked) {
        const { error } = await supabase
          .from("likes")
          .delete()
          .match({ user_id: session.user.id, template_id: templateId });
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("likes")
          .insert({ user_id: session.user.id, template_id: templateId });
        
        if (error && error.code !== '23505') throw error; 
      }
    } catch (error) {
      console.error("좋아요 에러", error);
      setIsLiked(isCurrentlyLiked);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleLike}
      disabled={isLoading}
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