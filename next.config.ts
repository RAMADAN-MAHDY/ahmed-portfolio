import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
      {
        protocol: "https",
        hostname: "static.flexmonster.com",
      },
      {
        protocol: "https",
        hostname: "blog.logrocket.com",
      },
    ],
  },
};

export default nextConfig;
