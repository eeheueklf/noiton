import { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const domain = "https://noitoner.vercel.app";

  const [templatesRes, categoriesRes] = await Promise.all([
    supabase.from('templates').select('slug, created_at'),
    supabase.from('categories').select('path')
  ]);

  const templates = templatesRes.data;
  const categories = categoriesRes.data;

  const templateUrls = templates?.map((t) => ({
    url: `${domain}/template/${t.slug}`,
    lastModified: new Date(t.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7, 
  })) || [];

  const categoryUrls = categories?.map((cat) => ({
    url: `${domain}/templates/${cat.path}`, 
    lastModified: new Date(),
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
    ...categoryUrls,
    ...templateUrls,
  ];
}