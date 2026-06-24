import { env } from "@/env/client";
import { sanityFetch } from "@/sanity/lib/live";
import { SITEMAP_QUERY } from "@/sanity/queries/sitemap";
import { SITEMAP_QUERY_RESULT } from "@/sanity/types";
import type { MetadataRoute } from "next";

type SitemapItem = {
  url: string;
  lastModified: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = (await sanityFetch({
    query: SITEMAP_QUERY,
    stega: false,
  })) as { data: SITEMAP_QUERY_RESULT };

  return data.map(
    (page: SITEMAP_QUERY_RESULT[number]): SitemapItem => ({
      url: `${env.NEXT_PUBLIC_SITE_URL}/${page.slug}`,
      lastModified: page._updatedAt
        ? new Date(page._updatedAt).toISOString()
        : new Date().toISOString(),
    }),
  );
}
