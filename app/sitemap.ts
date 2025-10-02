import { getBaseUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

const SITE_URL = getBaseUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  return routes;
}
