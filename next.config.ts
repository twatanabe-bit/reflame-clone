import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/reflame-clone",
  images: { unoptimized: true },
};

export default nextConfig;
