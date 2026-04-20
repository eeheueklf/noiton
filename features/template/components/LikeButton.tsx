"use client";

import { useLikeTemplate } from "../hooks/useLikeTemplate";
import LikeButtonIcon from "./LikeButtonIcon";

interface LikeButtonProps{
  templateId: string;
  initialIsLiked: boolean;
}
export default function LikeButton({ templateId, initialIsLiked }: LikeButtonProps) {
  const { isLiked, isPending, toggleLike} = useLikeTemplate({templateId, initialIsLiked});

  return (
    <button
      onClick={toggleLike}
      disabled={isPending}
      className={`inline-flex items-center justify-center bg-white px-3.5 py-3.5 rounded-md font-bold hover:bg-gray-100 shadow-sm`}
    >
      <LikeButtonIcon isLiked={isLiked} isPending={isPending} />
    </button>
  );
}