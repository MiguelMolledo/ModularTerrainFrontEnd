import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**', // Allow all paths
      },
    ],
    // domains: ['picsum.photos'],
  },
  /* config options here */
};

export default nextConfig;
