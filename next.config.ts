import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true, // Top-level in Next.js 16.1.x+
  cacheLife: {
    articles: {
      stale: 300, // 5 minutes
      revalidate: 900, // 15 minutes
      expire: 3600, // 1 hour
    },
    featured: {
      stale: 300, // 5 minutes
      revalidate: 900, // 15 minutes
      expire: 3600, // 1 hour
    },
    trending: {
      stale: 300, // 5 minutes
      revalidate: 900, // 15 minutes
      expire: 3600, // 1 hour
    },
    categories: {
      stale: 1200, 
      revalidate: 3600, 
      expire: 7200,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ]
  },
};

export default nextConfig;
