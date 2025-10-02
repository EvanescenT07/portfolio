// app/robots.ts
import { getBaseUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

const SITE_URL = getBaseUrl()

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
