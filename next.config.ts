import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Serve SVG icons through the optimizer as-is so they stay vector-crisp
    // instead of returning 400 ("image type is not allowed").
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
    // Allow higher optimizer qualities (our <Image> wrapper defaults to 90).
    qualities: [75, 85, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
