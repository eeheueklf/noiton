import { createClient } from "@/utils/supabase/server";
import { TemplatePreview } from "@/components/(main)/TemplatePreview";
import { fetchTemplatesByPath } from "@/features/fetchTemplatesByPath";
import { HomeVisual } from "@/components/(main)/HomeVisual";

export default async function Home() {
  const supabase = await createClient();

  const CATEGORY_CONFIG = [
    { path: "work", label: "업무 관련", subtitle: "생산성을 높여주는" },
    { path: "personal", label: "개인 관련", subtitle: "일상을 기록하는" },
    { path: "money", label: "자산 관리", subtitle: "똑똑하게 모으는" },
    { path: "interest", label: "취미/관심", subtitle: "취미 기록용" },
  ];

  const [popularTemplates, ...categoryDataSets] = await Promise.all([
    fetchTemplatesByPath(supabase, undefined, 3),
    ...CATEGORY_CONFIG.map((cat) => fetchTemplatesByPath(supabase, cat.path, 3)),
  ]);

  return (
    <>
      <HomeVisual/>

      <TemplatePreview 
        title="인기 템플릿" 
        subtitle="가장 많이 찾는 템플릿" 
        templates={popularTemplates} 
        href="/templates?sort=popular"
      />

      {CATEGORY_CONFIG.map((config, index) => (
        <TemplatePreview 
          key={config.path}
          title={`${config.label} 템플릿`} 
          subtitle={`${config.subtitle} 템플릿`} 
          templates={categoryDataSets[index]}
          href={`/templates?category=${config.path}`}
        />
      ))}
    </>
  );
}