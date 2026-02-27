"use client";

import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { createClient } from "@/utils/supabase/client";
import { setCredentials } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";

export function useUserUpdate() {
  const { update } = useSession();
  const dispatch = useDispatch();
  const supabase = createClient();
  const { userInfo } = useSelector((state: RootState) => state.user);

  const updateName = async (newName: string) => {
    if (!userInfo?.id || !newName.trim() || newName === userInfo.name) return;

    try {
      const { error } = await supabase
        .from("users")
        .update({ name: newName })
        .eq("id", userInfo.id);

      if (error) throw error;

      await update({ name: newName });
      dispatch(setCredentials({ ...userInfo, name: newName }));
      
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: err };
    }
  };

  const updateImage = async (newUrl: string | null) => {
    if (!userInfo?.id) return;

    try {
      const { error } = await supabase
        .from("users")
        .update({ image: newUrl })
        .eq("id", userInfo.id);

      if (error) throw error;

      await update({ image: newUrl });
      dispatch(setCredentials({ ...userInfo, image: newUrl }));
      
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: err };
    }
  };

  return { updateName, updateImage };
}