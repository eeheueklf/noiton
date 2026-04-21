import { createClient } from "@/utils/supabase/server";
import { TemplatePreview } from "@/components/(main)/TemplatePreview";
import { fetchTemplatesByPath } from "@/features/fetchTemplatesByPath";
import { HomeVisual } from "@/components/(main)/HomeVisual";
import { Template } from "@/types/template";

const MAIN_TEMPLATES_LIMIT = 3;
// TODO: 이외 카테고리는 템플릿 데이터가 들어오면 확장
const CATEGORY_CONFIG = [
  { path: "personal", label: "개인 관련", subtitle: "일상을 기록하는" },
  { path: "education", label: "학업 관련", subtitle: "효율적으로 관리하는" },
] as const;

export default async function Home() {
  const supabase = await createClient();

  let popularTemplates: Template[] = [];
  let categoryTemplates: Template[][] = []; 

  const data = await Promise.allSettled([
    fetchTemplatesByPath(supabase, undefined, MAIN_TEMPLATES_LIMIT),
    ...CATEGORY_CONFIG.map((category) => 
      fetchTemplatesByPath(supabase, category.path, MAIN_TEMPLATES_LIMIT)
    ),
  ]);
  data.forEach((item,index)=>{
    if(item.status==='rejected'){
      console.error(`템플릿 fetch 실패: index ${index}`, item.reason);
    }
  })
  popularTemplates = data[0].status === 'fulfilled' ? data[0].value : [];
  categoryTemplates = data.slice(1).map((item) => 
    item.status === 'fulfilled' ? item.value : []
  );
  
  return (
    <>
      <HomeVisual/>

      <TemplatePreview 
        title="인기 템플릿" 
        subtitle="가장 많이 찾는 템플릿" 
        templates={popularTemplates} 
        href="/templates?sort=popular"
      />

      {CATEGORY_CONFIG.map(({path, label, subtitle}, index) => (
        <TemplatePreview 
          key={path}
          title={`${label}`} 
          subtitle={`${subtitle}`} 
          templates={categoryTemplates[index]}
          href={`/templates/${path}`}
        />
      ))}
    </>
  );
}