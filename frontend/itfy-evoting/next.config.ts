import type { NextConfig } from "next";

const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
// Handle both cases: with /api/v1 suffix and without
const cleanBackendUrl = backendUrl.replace('/api/v1', '').replace('/api', '');
const backendUrlParsed = new URL(cleanBackendUrl);

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Output configuration for production
  output: process.env.STANDALONE_BUILD === 'true' ? 'standalone' : undefined,
  
  images: {
    loader: 'custom',
    loaderFile: './localLoader.ts',
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      // Production API server
      { protocol: 'https', hostname: 'api.itforyouthghana.org', pathname: '/uploads/**' },
      // Dynamic backend URL for uploads
      {
        protocol: backendUrlParsed.protocol.replace(':', '') as 'http' | 'https',
        hostname: backendUrlParsed.hostname,
        port: backendUrlParsed.port || '',
        pathname: '/uploads/**',
      },
    ],
    qualities: [75, 90],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Security headers for production
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;