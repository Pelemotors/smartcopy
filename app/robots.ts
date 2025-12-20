import type { MetadataRoute } from 'next';

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl.replace(/\/$/, '')}/sitemap.xml`,
  };
}


