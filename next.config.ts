import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",   // REQUIRED for GitHub Pages
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/spjvweb" : "",
  assetPrefix: isProd ? "/spjvweb/" : "",
  trailingSlash: true, // VERY IMPORTANT for static hosting
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