'use client'

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";


export default function DownloadButton({ url, templateId }: { url: string, templateId: string }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const supabase = createClient();

  const handleDownload = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase.rpc('increment_download_count', { 
        target_id: templateId 
      });

      if (error) throw error;
    } finally {
      window.open(url, '_blank');
      setIsUpdating(false);
    }
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={isUpdating}
      className={`inline-flex items-center justify-center bg-black text-white px-3.5 py-3.5 rounded-md font-bold transition-all shadow-sm ${
        isUpdating ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
    </button>
  );
}