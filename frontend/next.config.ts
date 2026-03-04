import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: '**.unsplash.com' },
    ],
  },
  // Allow the frontend to call the backend freely
  async rewrites() {
    return [];
  },
};

export default nextConfig;
