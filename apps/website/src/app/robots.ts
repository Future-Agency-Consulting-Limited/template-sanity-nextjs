import type { MetadataRoute } from "next";
import { NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_ALLOW_CRAWLER_BOTS } from "@/env";

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = `${NEXT_PUBLIC_SITE_URL}/sitemap.xml`;

  if (!NEXT_PUBLIC_ALLOW_CRAWLER_BOTS) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: sitemapUrl,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: sitemapUrl,
  };
}
