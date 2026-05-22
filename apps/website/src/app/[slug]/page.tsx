import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import {
  PAGE_METADATA_QUERY,
  PAGE_QUERY,
  PAGE_SLUGS_QUERY,
} from "@/sanity/queries/pages";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
    robots: {
      index: !data?.noIndex,
      follow: !data?.noFollow,
    },
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
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: await params,
  });

  if (!page || !page.content) {
    notFound();
  }

  return page?.content ? (
    <PageBuilder
      documentId={page._id}
      documentType={page._type}
      content={page.content}
    />
  ) : null;
}
