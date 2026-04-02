import { env } from "@/env/client";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = `${env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`;

  if (!env.NEXT_PUBLIC_ALLOW_CRAWLER_BOTS) {
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
