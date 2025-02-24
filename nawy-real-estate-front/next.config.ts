import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    PUBLIC_API_URL: process.env.PUBLIC_API_URL,
  },
  eslint: {
    ignoreDuringBuilds: true
  }
  
};

export default nextConfig;
