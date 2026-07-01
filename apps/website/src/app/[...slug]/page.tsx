import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import {
  PAGE_METADATA_QUERY,
  PAGE_QUERY,
  PAGE_SLUGS_QUERY,
} from "@/sanity/queries/pages";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WebPageJsonLd } from "@/components/patterns/json-ld/WebPageJsonLd";
import { env } from "@/env/client";
import { getSiteSettings } from "@/sanity/lib/siteSettings";
import {
  PAGE_METADATA_QUERY_RESULT,
  PAGE_QUERY_RESULT,
  PAGE_SLUGS_QUERY_RESULT,
} from "@/sanity/types";

function getPageSlug(slug?: string[]) {
  return slug?.[slug.length - 1] ?? "home";
}

/**
 * Generate static params for the page route so it can be pre-rendered
 */
export async function generateStaticParams() {
  const { data } = (await sanityFetch({
    query: PAGE_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  })) as { data: PAGE_SLUGS_QUERY_RESULT };

  return data;
}

/**
 * Generate metadata for the page route
 * @param params
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const pageSlug = getPageSlug(resolvedParams.slug);

  const { data } = (await sanityFetch({
    query: PAGE_METADATA_QUERY,
    params: { slug: pageSlug },
    // Metadata should never contain stega
    stega: false,
  })) as { data: PAGE_METADATA_QUERY_RESULT };

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
 *
 * @param params
 * @returns
 */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;
  const pageSlug = getPageSlug(resolvedParams.slug);
  const siteSettings = await getSiteSettings();

  const { data: page } = (await sanityFetch({
    query: PAGE_QUERY,
    params: { slug: pageSlug },
  })) as { data: PAGE_QUERY_RESULT };

  if (!page || !page.content) {
    notFound();
  }

  return page?.content ? (
    <>
      <WebPageJsonLd
        name={page?.metaTitle}
        url={`${env.NEXT_PUBLIC_SITE_URL}/${resolvedParams.slug.join("/")}`}
        description={page?.metaDescription ?? ""}
        inLanguage="en"
        publisherOrgName={siteSettings?.siteName ?? ""}
        // todo uncomment once you've added image component from dodl
        publisherLogoUrl={/*siteSettings?.logo?.src ??*/ ""}
      />
      <PageBuilder
        documentId={page._id}
        documentType={page._type}
        content={page.content}
      />
    </>
  ) : null;
}
