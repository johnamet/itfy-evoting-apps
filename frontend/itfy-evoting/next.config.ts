import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './localLoader.ts',
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'http', hostname: 'localhost', port: '3000', pathname: '/uploads/**' },
      { protocol: 'http', hostname: '127.0.0.1', port: '3000', pathname: '/uploads/**' },
    ],
    qualities: [75, 90],
    unoptimized: process.env.NODE_ENV === 'development', // Disable optimizer only in dev
  },
};

export default nextConfig;