import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  // Django's API paths end in /. Avoid a Next/Django redirect loop in dev.
  skipTrailingSlashRedirect: process.env.NODE_ENV === "development",
  async rewrites() {
    if (process.env.NODE_ENV !== "development") return [];

    const backendOrigin = (process.env.SITE_API_PROXY_TARGET ?? "http://localhost:8000").replace(
      /\/$/,
      ""
    );
    return [{ source: "/api/:path*", destination: `${backendOrigin}/api/:path*/` }];
  },
  images: {
    qualities: [75, 100],
  },
  turbopack: {
    root: path.join(process.cwd()),
  },
};

export default nextConfig;
