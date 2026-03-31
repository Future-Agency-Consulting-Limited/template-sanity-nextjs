import { PageBuilder } from "@/components/page-builder";
import { sanityFetch } from "@/sanity/lib/live";
import {
  PAGE_METADATA_QUERY,
  PAGE_QUERY,
  PAGE_SLUGS_QUERY,
} from "@/sanity/queries/pages";
import { isValidRegion, Region } from "@/utils/region";
import { parseSlugAndLanguage } from "@/utils/slug";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type RouteParams = {
  region: Region;
  slug: string[];
};

function assertValidRegion(region: string): asserts region is Region {
  if (!isValidRegion(region)) {
    notFound();
  }
}

/**
 * Generate static params for the page route so it can be pre-rendered
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: PAGE_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return data.map((item: { slug: string }) => ({
    slug: item.slug.split("/").filter(Boolean),
  }));
}

/**
 * Generate metadata for the page route
 * @param params
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { regionSlug, bareSlug } = parseSlugAndLanguage(
    resolvedParams.region,
    resolvedParams.slug,
  );

  const { data } = await sanityFetch({
    query: PAGE_METADATA_QUERY,
    params: { regionSlug, bareSlug },
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
  params: Promise<RouteParams>;
}) {
  const resolvedParams = await params;
  assertValidRegion(resolvedParams.region);

  const { regionSlug, bareSlug } = parseSlugAndLanguage(
    resolvedParams.region,
    resolvedParams.slug,
  );

  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: {
      regionSlug,
      bareSlug,
    },
  });

  return page?.content ? (
    <PageBuilder
      documentId={page._id}
      documentType={page._type}
      content={page.content}
    />
  ) : null;
}
