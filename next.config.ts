import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/cef",
        destination: "/cef2",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
