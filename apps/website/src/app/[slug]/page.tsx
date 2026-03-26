import { PageBuilder } from "@/components/page-builder";
import { sanityFetch } from "@/sanity/lib/live";
import {
  PAGE_METADATA_QUERY,
  PAGE_QUERY,
  PAGE_SLUGS_QUERY,
} from "@/sanity/queries/pages";
import type { Metadata } from "next";
import { headers } from "next/headers";

/**
 * Generate static params for the page route so it can be pre-rendered
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: PAGE_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return data;
}

/**
 * Generate metadata for the page route
 * @param params
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: PAGE_METADATA_QUERY,
    params: await params,
    // Metadata should never contain stega
    stega: false,
  });

  const metadata: Metadata = {
    title: data?.metaTitle || "",
    description: data?.metaDescription || "",
  };
  return metadata;
}

/**
 * Page component for the page route
 * @param params
 * @returns
 */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const headersList = await headers();
  const geoRegion = headersList.get("x-todl-geo-region") || "Unknown Region";

  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: await params,
  });

  return page?.content ? (
    <>
      <h1>Geo Region: {geoRegion}</h1>
      <PageBuilder
        documentId={page._id}
        documentType={page._type}
        content={page.content}
      />
    </>
  ) : null;
}
