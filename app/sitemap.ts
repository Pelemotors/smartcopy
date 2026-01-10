import type { MetadataRoute } from 'next';

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const root = baseUrl.replace(/\/$/, '');

  // Only home page for finance calculator
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${root}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  return staticPages;
}


