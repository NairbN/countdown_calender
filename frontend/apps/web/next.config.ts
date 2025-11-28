import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@countdown-calender/ui",
    "@countdown-calender/state",
    "@countdown-calender/api-client",
    "@countdown-calender/domain",
  ],
};

export default nextConfig;
