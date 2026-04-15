import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true, // Top-level in Next.js 16.1.x+
  cacheLife: {
    articles: {
      stale: 300, // 5 minutes
      revalidate: 900, // 15 minutes
      expire: 3600, // 1 hour
    }
  }
};

export default nextConfig;
