import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow CORS for all origins (for development purposes)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-Requested-With, Content-Type, Accept" },
        ],
      },
    ];
  },
} ; // Use 'as any' to bypass type checking for custom properties.



export default nextConfig;
