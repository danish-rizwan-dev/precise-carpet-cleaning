import type { MetadataRoute } from "next";
import site from "@/content/site.json";

const base = site.url.replace(/\/$/, "");

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
