import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "**.unsplash.com" },
    ],
  },

  // ignore typescript errors during deployment
  typescript: {
    ignoreBuildErrors: true,
  },

  // ignore eslint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [];
  },
};

export default nextConfig;