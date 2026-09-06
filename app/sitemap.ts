import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { services } from '@/lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { path: '/', priority: 1, freq: 'weekly' as const },
    { path: '/realisations', priority: 0.8, freq: 'monthly' as const },
    { path: '/contact', priority: 0.9, freq: 'yearly' as const },
    { path: '/mentions-legales', priority: 0.2, freq: 'yearly' as const },
    { path: '/politique-cookies', priority: 0.2, freq: 'yearly' as const },
  ];

  return [
    ...staticPages.map((p) => ({
      url: `${site.url}${p.path}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...services.map((s) => ({
      url: `${site.url}/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ];
}
