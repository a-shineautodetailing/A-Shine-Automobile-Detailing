import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Applebot',
          'GPTBot',
          'ClaudeBot',
          'PerplexityBot',
          'CCBot',
          'Google-Extended',
          'anthropic-ai',
          'cohere-ai',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://www.a-shineautomobiledetailing.ca/sitemap.xml',
    host: 'https://www.a-shineautomobiledetailing.ca',
  };
}