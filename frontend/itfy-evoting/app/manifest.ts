import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IT FOR Youth Ghana E-Voting',
    short_name: 'ITFY Vote',
    description: 'Official e-voting platform for IT FOR Youth Ghana events and elections',
    start_url: '/',
    display: 'standalone',
    background_color: '#111827',
    theme_color: '#0152be',
    orientation: 'portrait',
    icons: [
      {
        src: '/Asset-1.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/Asset-1.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  };
}
