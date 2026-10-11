import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { caseStudies } from '@/lib/caseStudies';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    ...caseStudies.map((study) => ({
      url: `${SITE_URL}/projects/${study.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ];
}
