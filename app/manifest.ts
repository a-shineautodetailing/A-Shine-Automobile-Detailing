import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'A-Shine Auto Mobile Detailing',
    short_name: 'A-Shine Auto',
    description:
      'Mobile interior car detailing in Kitchener-Waterloo. Steam cleaning, salt & stain removal, shampooing — we come to you.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#E31B23',
    icons: [
      {
        src: '/crescent-favicon.png?v=20261010',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/icon.png?v=20261010',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png?v=20261010',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
