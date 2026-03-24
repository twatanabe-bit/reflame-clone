import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/reflame-clone" : "",
  assetPrefix: isProd ? "/reflame-clone/" : "",
};

export default nextConfig;
