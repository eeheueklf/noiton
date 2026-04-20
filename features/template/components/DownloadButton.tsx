'use client'

import { useDownloadTemplate } from "@/features/template/hooks/useDownloadTemplate";

interface DownloadButtonProps{
  url: string; 
  templateId: string;
}
export default function DownloadButton({ url, templateId }: DownloadButtonProps) {
  const { isUpdating, handleDownload } = useDownloadTemplate({url, templateId});

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