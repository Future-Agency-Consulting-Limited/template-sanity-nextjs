import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import {
  BLOG_PAGE_METADATA_QUERY,
  BLOG_PAGE_QUERY,
  BLOG_PAGE_SLUGS_QUERY,
} from "@/sanity/queries/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/env/client";
import { getSiteSettings } from "@/sanity/lib/siteSettings";
import { parsePageLinks } from "@/sanity/lib/link";
import {
  BLOG_PAGE_METADATA_QUERY_RESULT,
  BLOG_PAGE_QUERY_RESULT,
  BLOG_PAGE_SLUGS_QUERY_RESULT,
} from "@/sanity/types";
import { ArticleJsonLd } from "@/components/patterns/json-ld/ArticleJsonLd";

function getPageSlug(slug?: string[]) {
  return slug?.[slug.length - 1] ?? "home";
}

/**
 * Generate static params for the page route so it can be pre-rendered
 */
export async function generateStaticParams() {
  if (!env.NEXT_PUBLIC_FEATURE_FLAG_BLOG) {
    return [];
  }

  const { data } = (await sanityFetch({
    query: BLOG_PAGE_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  })) as { data: BLOG_PAGE_SLUGS_QUERY_RESULT };

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
  if (!env.NEXT_PUBLIC_FEATURE_FLAG_BLOG) {
    return {};
  }

  const resolvedParams = await params;
  const pageSlug = getPageSlug(resolvedParams.slug);

  const { data } = (await sanityFetch({
    query: BLOG_PAGE_METADATA_QUERY,
    params: { slug: pageSlug },
    // Metadata should never contain stega
    stega: false,
  })) as { data: BLOG_PAGE_METADATA_QUERY_RESULT };

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
  if (!env.NEXT_PUBLIC_FEATURE_FLAG_BLOG) {
    notFound();
  }

  const resolvedParams = await params;
  const pageSlug = getPageSlug(resolvedParams.slug);
  const siteSettings = await getSiteSettings();

  const { data: page } = (await sanityFetch({
    query: BLOG_PAGE_QUERY,
    params: { slug: pageSlug },
  })) as { data: BLOG_PAGE_QUERY_RESULT };

  if (!page || !page.content) {
    notFound();
  }

  const parsedPage = await parsePageLinks(page);

  return parsedPage?.content ? (
    <>
      {/* todo update with appropriate metadata for a blog article */}
      <ArticleJsonLd
        headline={page.metaTitle || page.title}
        description={page.metaDescription ?? page.excerpt ?? ""}
        // todo uncomment once you've added image component from dodl
        imageUrl={/*page.mainImage?.src ??*/ ""}
        authorName={page.author?.name ?? ""}
        publisherOrgName={siteSettings?.siteName ?? ""}
        // todo uncomment once you've added image component from dodl
        publisherLogoUrl={/* siteSettings?.logo?.src ??*/ ""}
        datePublished={page.date ?? "1970-01-01"}
        articleSection={page.categories?.[0]?.title ?? ""}
      />

      <PageBuilder
        documentId={parsedPage._id}
        documentType={parsedPage._type}
        content={parsedPage.content}
      />
    </>
  ) : null;
}
