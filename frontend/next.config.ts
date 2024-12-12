import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/live-talk/api/v1/:path*",
        destination: "http://localhost:5000/live-talk/api/api/v1/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
