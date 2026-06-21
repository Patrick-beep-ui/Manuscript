import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/generate": ["./node_modules/@sparticuz/chromium/**/*"],
  },
};

export default nextConfig;
