import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the site builds to plain HTML/CSS/JS in `out/`,
  // which we upload to cPanel's public_html (no Node.js server needed).
  output: "export",
  // Emit `/about/index.html` instead of `/about.html` so Apache serves
  // clean URLs out of the box on cPanel.
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    // Required with `output: "export"` — there is no image optimizer
    // server at runtime. Source images are pre-optimised at build time.
    unoptimized: true,
  },
};

export default nextConfig;
