import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  images: {
    qualities: [75, 100],
  },
  turbopack: {
    root: path.join(process.cwd()),
  },
};

export default nextConfig;
