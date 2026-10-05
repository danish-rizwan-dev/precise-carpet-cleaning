import type { MetadataRoute } from "next";
import { servicesData } from "@/data/services";
import { articlesData } from "@/data/articles";
import site from "@/content/site.json";

const base = site.url.replace(/\/$/, "");

const staticPaths = [
  "",
  "about/",
  "services/",
  "pricing/",
  "blogs/",
  "gallery/",
  "appointment/",
  "contact/",
  "privacy-policy/",
  "terms-and-conditions/",
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}/${path}`,
  }));

  for (const service of Object.values(servicesData)) {
    entries.push({ url: `${base}/services/${service.id}/` });
  }

  for (const article of Object.values(articlesData)) {
    entries.push({ url: `${base}/blogs/${article.id}/` });
  }

  return entries;
}
