import { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const domain = "https://noitoner.vercel.app/"; // 👈 실제 배포할 도메인 주소로 변경하세요.

  const { data: templates } = await supabase
    .from('templates')
    .select('slug, created_at');

  const templateUrls = templates?.map((t) => ({
    url: `${domain}/templates/${t.slug}`,
    lastModified: new Date(t.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || [];

  return [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...templateUrls,
  ];
}