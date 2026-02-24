import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "shriprannathjivani": "",
  assetPrefix: isProd ? "shriprannathjivani": "",
};

export default nextConfig;

// const repoName = "spiritual-site"

// const nextConfig = {
//   output: "export",
//   basePath: `/${repoName}`,
//   assetPrefix: `/${repoName}/`,
//   images: {
//     unoptimized: true,
//   },
// }

// module.exports = nextConfig