"use client";

import { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, ChevronRight, X, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { CategorySelector } from "@/components/(main)/upload/new/CategorySelector";

export default function NewTemplatePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null); 
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!session) {
    redirect("/login");
  }

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    thumbnail_url: "",
    description: "",
    notion_page_id:"",
    category_id: "",
  });

  const isFormInvalid = useMemo(() => {
    const requiredFields = ['title', 'slug', 'thumbnail_url', 'description', 'notion_page_id', 'category_id'];
    return requiredFields.some(field => !formData[field as keyof typeof formData]?.trim());
  }, [formData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `template-thumbnails/${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("templates")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("templates")
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, thumbnail_url: publicUrl }));
    } catch (error: any) {
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormInvalid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const { data: existingSlug } = await supabase
        .from("templates")
        .select("slug")
        .eq("slug", formData.slug)
        .single();

      if (existingSlug) {
        alert("이미 사용 중인 URL 슬러그입니다. 다른 슬러그를 입력해주세요.");
        return;
      }

      const { error } = await supabase.from("templates").insert([{
        ...formData,
        creator_id: session?.user?.id
      }]);

      if (error) throw error;

      alert("템플릿이 성공적으로 등록되었습니다!");
      router.push("/upload");
      router.refresh();
    } catch (error: any) {
      console.error("등록 에러:", error.message);
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) return null;


  return (
    <div className="min-h-screen bg-white text-[#1e1e1e]">
      <section className="max-w-[1200px] mx-auto px-6 py-12">
        <header className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>대시보드</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-black font-medium">새 템플릿 추가</span>
          </div>
          <h1 className="text-3xl font-bold">새 템플릿 등록</h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">템플릿 제목</label>
            <input
              required
              type="text"
              placeholder="템플릿 이름을 입력해주세요"
              className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-gray-500 outline-none transition"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">URL 슬러그</label>
            <p className="text-xs text-gray-400">사이트에 등록되는 링크입니다</p>
            {/* 중복 제거해야됨 */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">noiton.com/templates/</span>
              <input
                type="text"
                className="flex-1 px-3 py-1.5 rounded border border-gray-200 text-sm bg-gray-50 outline-none"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">노션 링크</label>
            <p className="text-xs text-gray-400">노션 템플릿 링크 위치</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="예: https://[~].notion.site/[~]?source=copy_link"
                className="flex-1 px-3 py-1.5 rounded border border-gray-200 text-sm bg-gray-50 outline-none"
                value={formData.notion_page_id}
                onChange={(e) => setFormData({ ...formData, notion_page_id: e.target.value })}
              />
            </div>
          </div>


          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">카테고리 설정</label>
            <CategorySelector 
              onSelect={(id) => setFormData({ ...formData, category_id: id })} 
            />
            <p className="text-xs text-gray-400">최종 소분류까지 선택해야 등록이 가능합니다.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">썸네일 이미지</label>
            <input 
              type="file" accept="image/*" className="hidden" 
              ref={fileInputRef} onChange={handleImageUpload} 
            />
            {formData.thumbnail_url ? (
              <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden border border-gray-200 group">
                <img src={formData.thumbnail_url} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, thumbnail_url: "" })}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition cursor-pointer 
                ${isUploading ? "bg-gray-100 cursor-not-allowed" : "hover:bg-gray-50 border-gray-200"}`}
              >
                {isUploading ? <Loader2 className="animate-spin text-gray-400" /> : <ImageIcon className="text-gray-400" />}
                <span className="text-sm text-gray-500 mt-2">{isUploading ? "업로드 중..." : "이미지 업로드"}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">상세 설명</label>
            <textarea
              rows={5}
              placeholder="이 템플릿의 특징과 사용법을 적어주세요."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-500 outline-none transition resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex justify-start pt-4">
            <button
              type="submit"
              disabled={isFormInvalid || isSubmitting || isUploading}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-800 transition disabled:cursor-not-allowed text-sm cursor-pointer"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? "" : "템플릿 등록하기"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}