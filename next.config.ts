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
      {
        protocol: "https",
        hostname: "i.ibb.co", 
      },
    ],
  },
};

export default nextConfig;
